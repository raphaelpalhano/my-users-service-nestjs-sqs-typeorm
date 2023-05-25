import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './core/database';
import { AllExceptionsFilters } from './core/filters';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SqsInternalModule } from './sqs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.register(),
    UsersModule,
    AuthModule,
    SqsInternalModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilters }],
})
export class AppModule {}
