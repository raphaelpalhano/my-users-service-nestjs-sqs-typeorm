import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListUsersUsecase } from 'src/modules/users/application/use-cases';
import { UserEntity } from 'src/database/typeorm/entities';
import { repositoryMock, userMock } from 'test/mocks';
import { Repository } from 'typeorm';

describe('Create user in Users Usecase', () => {
  let sut: ListUsersUsecase;
  let userRepository: Repository<UserEntity>;
  const userRepositoryMock = repositoryMock();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ListUsersUsecase,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<ListUsersUsecase>(ListUsersUsecase);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Given I create a valid user', async () => {
    //arrange
    const listUsers = userMock(3);

    // valid response
    const responseExpect: UserEntity[] = listUsers;

    // return user list
    userRepositoryMock.find.mockResolvedValue(listUsers);

    //act get list
    const result = await sut.execute();

    //Assert
    expect(sut).toBeDefined();
    expect(result).toHaveLength(3);
    expect(userRepository.find).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      select: [
        'id',
        'email',
        'name',
        'birthDate',
        'createdAt',
        'updatedAt',
        'age',
      ],
    });

    expect(result).toEqual(responseExpect);
  });
});
