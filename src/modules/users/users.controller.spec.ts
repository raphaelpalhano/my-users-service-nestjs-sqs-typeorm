import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './application/controllers';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  FindUsersUsecase,
  ListUsersUsecase,
  UpdateUserUsecase,
} from './application/use-cases';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CreateUsersUsecase,
        DeleteUsersUsecase,
        FindUsersUsecase,
        ListUsersUsecase,
        UpdateUserUsecase,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
