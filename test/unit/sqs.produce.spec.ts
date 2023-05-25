import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SqsService } from '@ssut/nestjs-sqs';
import { SQS_QUEUE_NAME } from 'src/core/domain/enums/sqs-queu.enum';

import { SQSProducer } from 'src/core/producer';
import { UserEntity } from 'src/modules/users/database/typeorm/entities';
import { repositoryMock, userMock } from 'test/mocks';

describe('SQS Producer', () => {
  let sut: SQSProducer;
  let spySutHandle: jest.SpyInstance;
  const createdQueue: SQS_QUEUE_NAME = SQS_QUEUE_NAME.userCreated;
  const deletedQueue: SQS_QUEUE_NAME = SQS_QUEUE_NAME.userDeleted;
  const updatedQueue: SQS_QUEUE_NAME = SQS_QUEUE_NAME.userUpdated;

  const userRepositoryMock = repositoryMock();

  const mockSQSService = {
    send: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        SQSProducer,
        {
          provide: SqsService,
          useValue: mockSQSService,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    sut = await module.get(SQSProducer);
    spySutHandle = jest.spyOn(sut, 'emit');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Given I send created user a Queue', async () => {
    // arrange
    const payloadUser = userMock(1)[0];
    const spySqsService = jest.spyOn(mockSQSService, 'send');

    // act
    await sut.emit(createdQueue, payloadUser);

    // assert
    expect(sut).toBeDefined();
    expect(spySutHandle).toHaveBeenCalledTimes(1);
    expect(spySutHandle).toHaveBeenCalledWith(createdQueue, payloadUser);
    expect(spySqsService).toHaveBeenCalledWith(createdQueue, {
      id: expect.any(String),
      body: payloadUser,
      delaySeconds: 0,
    });
  });

  it('Given I send deleted user a Queue', async () => {
    // arrange
    const payloadUser = userMock(1)[0];
    const spySqsService = jest.spyOn(mockSQSService, 'send');

    // act
    await sut.emit(deletedQueue, payloadUser);

    // assert
    expect(sut).toBeDefined();
    expect(spySutHandle).toHaveBeenCalledTimes(2);
    expect(spySutHandle).toHaveBeenCalledWith(deletedQueue, payloadUser);
    expect(spySqsService).toHaveBeenCalledWith(deletedQueue, {
      id: expect.any(String),
      body: payloadUser,
      delaySeconds: 0,
    });
  });

  it('Given I send updated user a Queue', async () => {
    // arrange
    const payloadUser = userMock(1)[0];
    const spySqsService = jest.spyOn(mockSQSService, 'send');

    // act
    await sut.emit(updatedQueue, payloadUser);

    // assert
    expect(sut).toBeDefined();
    expect(spySutHandle).toHaveBeenCalledTimes(3);
    expect(spySutHandle).toHaveBeenCalledWith(updatedQueue, payloadUser);
    expect(spySqsService).toHaveBeenCalledWith(updatedQueue, {
      id: expect.any(String),
      body: payloadUser,
      delaySeconds: 0,
    });
  });
});
