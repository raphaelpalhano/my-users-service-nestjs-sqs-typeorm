import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './application/controllers';
import { UsersUseCase } from './application/use-cases/users.usecase';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersUseCase],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
