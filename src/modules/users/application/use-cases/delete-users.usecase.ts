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

    await this.userRepository.softDelete(id);

    // const deletedUser = await this.userRepository.query(
    //   `SELECT * FROM users WHERE id=${id};`,
    // );

    const deletedUser = await this.userRepository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.id = :id', { id })
      .getOne();

    return {
      name: deletedUser.name,
      email: deletedUser.email,
      birthDate: deletedUser.birthDate,
      age: deletedUser.age,
      id: deletedUser.id,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt,
      deletedAt: deletedUser.deletedAt,
    };
  }
}
