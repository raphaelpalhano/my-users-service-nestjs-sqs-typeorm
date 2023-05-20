import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import {
  BAD_REQUEST,
  NOT_FOUND,
} from '../../domain/constants/users-exceptions.domain';

@Injectable()
export class DeleteUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(id: number) {
    if (id < 1 || typeof id !== 'number') {
      throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    const userToDelte = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userToDelte) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.softDelete({ id });
  }
}