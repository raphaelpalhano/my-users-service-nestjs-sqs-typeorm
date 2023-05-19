import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class FindUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(options: FindOneOptions<UserDto>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException({
        type: 'Resource_Not_Found',
        description: 'Resource not found.',
        notifications: ['Usuario não encontrado'],
      });
    }
  }
}
