import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto';
import {
  CONFLICT,
  NOT_FOUND,
} from '../../../../core/domain/constants/users-exceptions.domain';
import { userAge } from 'src/core/helpers/user-age.helper';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async execute(id: string, data: UpdateUserDto) {
    await this.validIfUserIsLessThanEighteen(id, data);
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (data.birthDate) {
      data.age = userAge(data.birthDate);
    }

    if (!userToUpdate) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.userRepository.merge(userToUpdate, data);
    const savedUser = await this.userRepository.save(userToUpdate);
    return {
      name: savedUser.name,
      email: savedUser.email,
      birthDate: savedUser.birthDate,
      age: savedUser.age,
      id: savedUser.id,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  private async validIfUserIsLessThanEighteen(
    id: string,
    data: UpdateUserDto,
  ): Promise<void> {
    let validIfUserLessEighteen: number;

    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user && data.birthDate) {
      validIfUserLessEighteen = userAge(data.birthDate);
    }
    if (validIfUserLessEighteen < 18) {
      throw new HttpException(CONFLICT, HttpStatus.CONFLICT);
    }
  }
}
