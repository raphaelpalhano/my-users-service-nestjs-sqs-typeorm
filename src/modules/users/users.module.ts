import { Module } from '@nestjs/common';
import { FindUsersUsecase } from './application/use-cases/find-users.usecase';
import { UsersController } from './application/controllers';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  ListUsersUsecase,
  UpdateUserUsecase,
} from './application/use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    ListUsersUsecase,
    CreateUsersUsecase,
    UpdateUserUsecase,
    FindUsersUsecase,
    DeleteUsersUsecase,
  ],
  exports: [
    ListUsersUsecase,
    CreateUsersUsecase,
    UpdateUserUsecase,
    FindUsersUsecase,
    DeleteUsersUsecase,
  ],
})
export class UsersModule {}
