import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CONFLICT } from 'src/core/domain/constants';
import { SQS_QUEUE_NAMES } from 'src/core/domain/constants/sqs-queue.constants';
import { userAge } from 'src/core/helpers';
import { SQSProducer } from 'src/core/producer';
import { CreateUserDto } from 'src/modules/users/application/dto';
import { CreateUsersUsecase } from 'src/modules/users/application/use-cases';
import { UserEntity } from 'src/modules/users/database/typeorm/entities';
import { repositoryMock, userMock } from 'test/mocks';
import { Repository } from 'typeorm';

describe('Create user in Users Usecase', () => {
  let sut: CreateUsersUsecase;
  let userRepository: Repository<UserEntity>;
  const userRepositoryMock = repositoryMock();

  const mockSQSService = {
    emit: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUsersUsecase,
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

    sut = module.get<CreateUsersUsecase>(CreateUsersUsecase);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Given I create a valid user', async () => {
    //arrange
    const yearBorn = '1997-05-21';

    const user = new UserEntity({
      id: '05b4436e-ccf0-4367-8ef7-46efce1915fa',
      name: 'Rafas',
      email: 'rafaloArevalos@gmail.com',
      password: 'Password2211.@',
      birthDate: yearBorn,
      age: userAge(yearBorn),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // request dto
    const createUserDto: CreateUserDto = {
      name: user.name,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      age: user.age,
    };
    // valid response
    const responseExpect = {
      id: user.id,
      name: user.name,
      age: 26,
      email: user.email,
      birthDate: yearBorn,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    // user doesnt exist
    userRepositoryMock.find.mockResolvedValue([]);

    // register user
    userRepositoryMock.create.mockReturnValue(user);
    userRepositoryMock.save.mockResolvedValue(user);

    //act
    const result = await sut.execute(createUserDto);

    //Assert
    expect(result).toBeDefined();
    expect(result).toEqual(responseExpect);
    expect(userRepository.find).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(mockSQSService.emit.mock.calls[0][1]).toEqual({
      eventType: SQS_QUEUE_NAMES.userCreated,
      user: result,
    });
  });

  it('Resource defined', () => {
    expect(sut).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('Given I have email registered in base', async () => {
    //arrange
    const user = userMock(1);

    // request dto
    const createUserDto: CreateUserDto = {
      name: user[0].name,
      email: user[0].email,
      password: user[0].password,
      birthDate: user[0].birthDate,
      age: user[0].age,
    };

    // get user registred
    userRepositoryMock.find.mockReturnValue([user]);

    //Assert
    await expect(sut.execute(createUserDto)).rejects.toThrowError(
      new HttpException(CONFLICT, HttpStatus.CONFLICT),
    );
  });

  it('Given I have minor user try to register in system', async () => {
    //arrange
    const user = new UserEntity({
      id: '05b4436e-ccf0-4367-8ef7-46efce1915fa',
      name: 'Rafas',
      email: 'rafaloArevalos@gmail.com',
      password: 'Password2211.@',
      birthDate: '2010-05-22',
      age: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user.age = userAge(user.birthDate);

    // request dto
    const createUserDto: CreateUserDto = {
      name: user.name,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      age: user.age,
    };

    // get user registred
    userRepositoryMock.find.mockResolvedValue([]);

    userRepositoryMock.find.mockResolvedValue(createUserDto);

    //Assert
    await expect(sut.execute(createUserDto)).rejects.toThrowError(
      new HttpException(CONFLICT, HttpStatus.CONFLICT),
    );
  });
});
