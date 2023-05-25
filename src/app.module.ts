import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilters } from './core/filters/all-exceptions.filter';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/data-base.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.register(),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilters }],
})
export class AppModule {}
