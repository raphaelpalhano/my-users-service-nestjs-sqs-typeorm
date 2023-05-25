import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/typeorm/entities/user.entity';
import { NOT_FOUND } from '../../../../core/domain/constants/users-exceptions.domain';
import { SQSProducer } from 'src/core/producer';
import { SQSPayloadDto } from '../dto/sqs-payload.dto';
import { SQS_QUEUE_NAME } from 'src/core/domain/enums/sqs-queu.enum';

@Injectable()
export class DeleteUsersUsecase {
  private readonly logger = new Logger(DeleteUsersUsecase.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sqsProducer: SQSProducer,
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

    const deletedUser = await this.userRepository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.id = :id', { id })
      .getOne();

    const payloadUser = {
      name: deletedUser.name,
      email: deletedUser.email,
      birthDate: deletedUser.birthDate,
      age: deletedUser.age,
      id: deletedUser.id,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt,
      deletedAt: deletedUser.deletedAt,
    };

    const requestHttpWebHookPayload: SQSPayloadDto = {
      eventType: 'userDeleted',
      user: payloadUser,
    };

    await this.sqsProducer.emit(
      SQS_QUEUE_NAME.userDeleted,
      requestHttpWebHookPayload,
    );

    return payloadUser;
  }
}
