import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CONFLICT, NOT_FOUND } from 'src/core/domain/constants';
import { userAge } from 'src/core/helpers';
import { UpdateUserDto } from 'src/modules/users/application/dto';
import { UpdateUsersUsecase } from 'src/modules/users/application/use-cases';
import { UserEntity } from 'src/modules/users/database/typeorm/entities';
import { repositoryMock } from 'test/mocks';
import { Repository } from 'typeorm';

describe('Create user in Users Usecase', () => {
  let sut: UpdateUsersUsecase;
  let userRepository: Repository<UserEntity>;
  const userRepositoryMock = repositoryMock();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateUsersUsecase,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<UpdateUsersUsecase>(UpdateUsersUsecase);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Given I update a valid user', async () => {
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
    });

    user.age = userAge(user.birthDate);

    // request dto
    const updateUserDto: UpdateUserDto = {
      name: 'Rafelo',
      password: 'Assx@.3121Ax',
      birthDate: '2002-03-24',
      age: 0,
    };
    updateUserDto.age = userAge(updateUserDto.birthDate);

    // valid response
    const responseExpect = {
      id: user.id,
      name: updateUserDto.name,
      age: updateUserDto.age,
      email: user.email,
      birthDate: updateUserDto.birthDate,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    // user doesnt exist
    userRepositoryMock.findOne.mockResolvedValue(user);

    // register user
    userRepositoryMock.merge.mockImplementation((user, dto) => {
      user.name = dto.name;
      user.password = dto.password;
      user.birthDate = dto.birthDate;
      user.age = dto.age;
      return user;
    });
    userRepositoryMock.save.mockResolvedValue(user);

    //act
    const result = await sut.execute(user.id, updateUserDto);

    //Assert
    expect(result).toBeDefined();
    expect(result).toEqual(responseExpect);
    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    expect(userRepository.merge).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledTimes(1);
  });

  it('I try to update minor user', async () => {
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
    });

    user.age = userAge(user.birthDate);

    // request dto
    const updateUserDto: UpdateUserDto = {
      name: 'Rafelo',
      password: 'Assx@.3121Ax',
      birthDate: '2010-03-24',
      age: 0,
    };
    updateUserDto.age = userAge(updateUserDto.birthDate);

    // user doesnt exist
    userRepositoryMock.findOne.mockResolvedValue(user);

    // register user
    userRepositoryMock.merge.mockImplementation((user, dto) => {
      user.name = dto.name;
      user.password = dto.password;
      user.birthDate = dto.birthDate;
      user.age = dto.age;
      return user;
    });

    await expect(sut.execute(user.id, updateUserDto)).rejects.toThrowError(
      new HttpException(CONFLICT, HttpStatus.CONFLICT),
    );
  });

  it('I try to update minor user', async () => {
    //arrange

    // request dto
    const updateUserDto: UpdateUserDto = {
      name: 'Rafelo',
      password: 'Assx@.3121Ax',
      birthDate: '2000-03-24',
      age: 0,
    };
    updateUserDto.age = userAge(updateUserDto.birthDate);

    // user doesnt exist
    userRepositoryMock.findOne.mockResolvedValue(Promise.resolve());

    await expect(
      sut.execute('05b4436e-ccf0-4367-8ef7-46efce1915fa', updateUserDto),
    ).rejects.toThrowError(new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND));
  });
});
