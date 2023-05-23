import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { CONFLICT } from 'src/core/domain/constants/users-exceptions.domain';
import { userAge } from 'src/core/helpers/user-age.helper';

@Injectable()
export class CreateUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(data: CreateUserDto) {
    await this.validIfUserExist(data);
    await this.validIfUserIsLessThanEighteen(data);
    data.age = userAge(data.birthDate);
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
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

  private async validIfUserExist(data: CreateUserDto): Promise<void> {
    const user = await this.userRepository.find({
      where: {
        email: data.email,
      },
    });

    if (user.length > 0) {
      throw new HttpException(CONFLICT, HttpStatus.CONFLICT);
    }
  }

  private async validIfUserIsLessThanEighteen(
    data: CreateUserDto,
  ): Promise<void> {
    const validIfUserLessEighteen = userAge(data.birthDate);
    if (validIfUserLessEighteen < 18) {
      throw new HttpException(CONFLICT, HttpStatus.CONFLICT);
    }
  }
}
