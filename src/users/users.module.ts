import { Module } from '@nestjs/common';
import { UsersUseCase } from './application/use-cases/users.usecase';
import { UsersController } from './application/controllers';

@Module({
  controllers: [UsersController],
  providers: [UsersUseCase],
})
export class UsersModule {}
