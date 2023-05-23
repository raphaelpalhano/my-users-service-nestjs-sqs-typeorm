import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { NOT_FOUND } from '../../../../core/domain/constants/users-exceptions.domain';

@Injectable()
export class DeleteUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(id: string) {
    const userToDelte = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userToDelte) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.softDelete({ id });

    return {
      name: userToDelte.name,
      email: userToDelte.email,
      birthDate: userToDelte.birthDate,
      age: userToDelte.age,
      id: userToDelte.id,
      createdAt: userToDelte.createdAt,
      updatedAt: userToDelte.updatedAt,
    };
  }
}
