import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async execute(id: number, data: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userToUpdate) {
      throw new NotFoundException({
        type: 'Resource_Not_Found',
        description: 'Resource not found.',
        notifications: ['Usuario não encontrado'],
      });
    }

    this.userRepository.merge(userToUpdate, data);
    return await this.userRepository.save(userToUpdate);
  }
}
