import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { NOT_FOUND } from '../../../../core/domain/constants/users-exceptions.domain';

@Injectable()
export class FindUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(options?: FindOneOptions<UserEntity>) {
    try {
      const user = await this.userRepository.findOneOrFail(options);
      return user;
    } catch (error) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
