import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NOT_FOUND } from 'src/core/domain/constants';
import { SQS_QUEUE_NAMES } from 'src/core/domain/constants/sqs-queue.constants';
import { userAge } from 'src/core/helpers';
import { SQSProducer } from 'src/core/producer';
import { DeleteUsersUsecase } from 'src/modules/users/application/use-cases';
import { UserEntity } from 'src/modules/users/database/typeorm/entities';
import { repositoryMock } from 'test/mocks';
import { Repository } from 'typeorm';

describe('Delete user Usecase', () => {
  let sut: DeleteUsersUsecase;
  let userRepository: Repository<UserEntity>;
  const userRepositoryMock = repositoryMock();
  const mockSQSService = {
    emit: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteUsersUsecase,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
        {
          provide: SQSProducer,
          useValue: mockSQSService,
        },
      ],
    }).compile();

    sut = module.get<DeleteUsersUsecase>(DeleteUsersUsecase);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Given I delete a exist user', async () => {
    //arrange
    const user = new UserEntity({
      id: '05b4436e-ccf0-4367-8ef7-46efce1915fa',
      name: 'Rafas',
      email: 'rafaloArevalos@gmail.com',
      password: 'Password2211.@',
      birthDate: '1997-05-21',
      age: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    });

    user.age = userAge(user.birthDate);

    // request dto

    // valid response
    const responseExpect = {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      age: user.age,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
    // user doesnt exist
    userRepositoryMock.findOne.mockResolvedValue(user);

    // register user
    userRepositoryMock.softDelete.mockResolvedValue(user);

    userRepositoryMock.createQueryBuilder = jest.fn().mockReturnValue({
      withDeleted: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(user),
    });

    //act
    const result = await sut.execute(user.id);

    //Assert
    expect(sut).toBeDefined();
    expect(result).toEqual(responseExpect);
    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    expect(userRepository.softDelete).toHaveBeenCalledTimes(1);
    expect(mockSQSService.emit.mock.calls[0][1]).toEqual({
      eventType: SQS_QUEUE_NAMES.userDeleted,
      user: result,
    });
  });

  it('Given I not found user', async () => {
    // user doesnt exist

    userRepositoryMock.findOne.mockResolvedValue(Promise.resolve());

    await expect(
      sut.execute('05b4436e-ccf0-4367-8ef7-46efce1915fasa'),
    ).rejects.toThrowError(new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND));
  });
});
