import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NOT_FOUND } from 'src/core/domain/constants';
import { FindUsersUsecase } from 'src/modules/users/application/use-cases';
import { UserEntity } from 'src/database/typeorm/entities';
import { repositoryMock, userMock } from 'test/mocks';
import { Repository } from 'typeorm';

describe('Create user in Users Usecase', () => {
  let sut: FindUsersUsecase;
  let userRepository: Repository<UserEntity>;
  const userRepositoryMock = repositoryMock();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FindUsersUsecase,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<FindUsersUsecase>(FindUsersUsecase);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Given I create a valid user', async () => {
    //arrange
    const user = userMock(1)[0];

    // valid response
    const responseExpect: UserEntity = user;

    // return user list
    userRepositoryMock.findOneOrFail.mockResolvedValue(user);

    //act get list
    const result = await sut.execute({ where: { id: user.id } });

    //Assert
    expect(sut).toBeDefined();
    expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(result).toEqual(responseExpect);
  });

  it('Given I not found user', async () => {
    // user doesnt exist

    userRepositoryMock.findOneOrFail.mockResolvedValue(Promise.resolve());

    jest
      .spyOn(userRepository, 'findOneOrFail')
      .mockRejectedValueOnce(
        new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND),
      );

    await expect(
      sut.execute({ where: { id: '05b4436e-ccf0-4367-8ef7-46efce1915fasa' } }),
    ).rejects.toThrowError(new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND));
  });
});
