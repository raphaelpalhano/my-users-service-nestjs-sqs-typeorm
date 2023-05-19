import { Module } from '@nestjs/common';
import { FindUsersUsecase } from './application/use-cases/find-users.usecase';
import { UsersController } from './application/controllers';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  ListUsersUsecase,
  UpdateUserUsecase,
} from './application/use-cases';

@Module({
  controllers: [UsersController],
  providers: [
    ListUsersUsecase,
    CreateUsersUsecase,
    UpdateUserUsecase,
    FindUsersUsecase,
    DeleteUsersUsecase,
  ],
})
export class UsersModule {}
