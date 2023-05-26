import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../database/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto';
import {
  CONFLICT,
  NOT_FOUND,
} from '../../../../core/domain/constants/users-exceptions.domain';
import { userAge } from 'src/core/helpers/user-age.helper';
import { SQSPayloadDto } from '../dto/sqs-payload.dto';
import { SQS_QUEUE_NAME } from 'src/core/domain/enums/sqs-queu.enum';
import { SQSProducer } from 'src/core/producer';

@Injectable()
export class UpdateUsersUsecase {
  private readonly logger = new Logger(UpdateUsersUsecase.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sqsProducer: SQSProducer,
  ) {}
  public async execute(id: string, data: UpdateUserDto) {
    await this.validIfUserIsLessThanEighteen(data);
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userToUpdate) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.userRepository.merge(userToUpdate, data);
    const savedUser = await this.userRepository.save(userToUpdate);
    const bodyUpdatedUser = {
      name: savedUser.name,
      email: savedUser.email,
      birthDate: savedUser.birthDate,
      age: savedUser.age,
      id: savedUser.id,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    const requestHttpWebHookPayload: SQSPayloadDto = {
      eventType: 'userUpdated',
      user: bodyUpdatedUser,
    };

    try {
      await this.sqsProducer.emit(
        SQS_QUEUE_NAME.userUpdated,
        requestHttpWebHookPayload,
      );
    } catch (error) {
      this.logger.error(
        `::: Error ao enviar a mensagem ao sqs:  ${
          (error as Error).message
        } :::`,
      );
    }

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
    data: UpdateUserDto,
  ): Promise<void> {
    if (data.birthDate) {
      data.age = userAge(data.birthDate);
    }
    if (data.age < 18) {
      throw new HttpException(CONFLICT, HttpStatus.CONFLICT);
    }
  }
}
