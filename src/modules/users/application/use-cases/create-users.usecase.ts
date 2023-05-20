import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';

@Injectable()
export class CreateUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    return {
      name: savedUser.name,
      email: savedUser.email,
      birthDate: savedUser.birthDate,
      deletedAt: savedUser.deletedAt,
      id: savedUser.id,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }
}
