import { Test, TestingModule } from '@nestjs/testing';
import { UsersUseCase } from './application/use-cases';

describe('UsersService', () => {
  let service: UsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUseCase],
    }).compile();

    service = module.get<UsersUseCase>(UsersUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
