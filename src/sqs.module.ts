import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';

import { sqs } from './core/config';
import { SQS_QUEUE_NAMES } from './core/domain/constants/sqs-queue.constants';

@Module({
  imports: [
    SqsModule.register({
      producers: [
        {
          sqs,
          name: SQS_QUEUE_NAMES.userCreated,
          queueUrl: process.env.AWS_SQS_URL_READY_CREATED_USER as string,
        },
        {
          sqs,
          name: SQS_QUEUE_NAMES.userUpdated,
          queueUrl: process.env.AWS_SQS_URL_READY_UPDATED_USER as string,
        },
        {
          sqs,
          name: SQS_QUEUE_NAMES.userDeleted,
          queueUrl: process.env.AWS_SQS_URL_READY_DELETED_USER as string,
        },
        {
          sqs,
          name: SQS_QUEUE_NAMES.userInvalid,
          queueUrl: process.env.AWS_SQS_URL_READY as string,
        },
      ],
    }),
  ],
})
export class SqsInternalModule {}
