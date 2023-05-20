import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  FindUsersUsecase,
  ListUsersUsecase,
  UpdateUserUsecase,
} from './application/use-cases';
describe('UsersService', () => {
  let creteUsecase: CreateUsersUsecase;
  let deleteUseCase: DeleteUsersUsecase;
  let findUsersUsecase: FindUsersUsecase;
  let listUsersUsecase: ListUsersUsecase;
  let updateUsersUsecase: UpdateUserUsecase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsersUsecase,
        DeleteUsersUsecase,
        FindUsersUsecase,
        ListUsersUsecase,
        UpdateUserUsecase,
      ],
    }).compile();

    creteUsecase = module.get<CreateUsersUsecase>(CreateUsersUsecase);
    deleteUseCase = module.get<DeleteUsersUsecase>(DeleteUsersUsecase);
    findUsersUsecase = module.get<FindUsersUsecase>(FindUsersUsecase);
    listUsersUsecase = module.get<ListUsersUsecase>(ListUsersUsecase);
    updateUsersUsecase = module.get<UpdateUserUsecase>(UpdateUserUsecase);
  });

  it('should be defined', () => {
    expect(creteUsecase).toBeDefined();
  });

  it('should be defined', () => {
    expect(deleteUseCase).toBeDefined();
  });

  it('should be defined', () => {
    expect(findUsersUsecase).toBeDefined();
  });
  it('should be defined', () => {
    expect(listUsersUsecase).toBeDefined();
  });

  it('should be defined', () => {
    expect(updateUsersUsecase).toBeDefined();
  });
});
