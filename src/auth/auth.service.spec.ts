import { Test, TestingModule } from '@nestjs/testing';
import { AuthUsecase } from './use-cases/auth.usecase';

describe('AuthService', () => {
  let service: AuthUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthUsecase],
    }).compile();

    service = module.get<AuthUsecase>(AuthUsecase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
