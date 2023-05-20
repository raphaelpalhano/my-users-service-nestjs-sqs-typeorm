import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto';
import {
  BAD_REQUEST,
  NOT_FOUND,
} from '../../domain/constants/users-exceptions.domain';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async execute(id: number, data: UpdateUserDto) {
    if (id < 1 || typeof id !== 'number') {
      throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userToUpdate) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.userRepository.merge(userToUpdate, data);
    return await this.userRepository.save(userToUpdate);
  }
}
