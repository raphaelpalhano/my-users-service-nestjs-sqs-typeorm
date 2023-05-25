import { SQS } from '@aws-sdk/client-sqs';

export const sqs = new SQS({
  region: process.env.AWS_REGION || 'us-east-1',
  ...(process.env.NODE_ENV?.toLowerCase() !== 'production' && {
    endpoint: 'https://localhost.localstack.cloud:4566',
  }),
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
});
