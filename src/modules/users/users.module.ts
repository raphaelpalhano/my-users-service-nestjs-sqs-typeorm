import { Module } from '@nestjs/common';
import { FindUsersUsecase } from './application/use-cases/find-users.usecase';
import { UsersController } from './application/controllers';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  ListUsersUsecase,
  UpdateUsersUsecase,
} from './application/use-cases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './database/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    ListUsersUsecase,
    CreateUsersUsecase,
    UpdateUsersUsecase,
    FindUsersUsecase,
    DeleteUsersUsecase,
  ],
  exports: [
    ListUsersUsecase,
    CreateUsersUsecase,
    UpdateUsersUsecase,
    FindUsersUsecase,
    DeleteUsersUsecase,
  ],
})
export class UsersModule {}
