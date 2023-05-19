import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  execute() {
    const users = this.userRepository.find({
      select: ['id', 'email', 'name', 'birthDate'],
    });

    return users;
  }
}
