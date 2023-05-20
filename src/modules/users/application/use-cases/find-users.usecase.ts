import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import {} from '../dto/user.dto';
import {
  BAD_REQUEST,
  NOT_FOUND,
} from '../../domain/constants/users-exceptions.domain';

@Injectable()
export class FindUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(id: number) {
    if (id < 1 || typeof id !== 'number') {
      throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
