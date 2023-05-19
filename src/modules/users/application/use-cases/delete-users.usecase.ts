import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';

@Injectable()
export class DeleteUsersUsecase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async execute(id: number) {
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

    await this.userRepository.softDelete({ id });
  }
}
