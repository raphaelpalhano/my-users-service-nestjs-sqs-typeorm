import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { SQS_QUEUE_NAMES } from '../domain/constants/sqs-queue.constants';

@Injectable()
export class SQSProducer {
  constructor(private readonly sqsService: SqsService) {}

  public async emit<T>(queue: keyof typeof SQS_QUEUE_NAMES, event: T) {
    await this.sqsService.send(SQS_QUEUE_NAMES[queue], {
      id: randomUUID(),
      body: event,
      delaySeconds: 0,
    });
  }
}
