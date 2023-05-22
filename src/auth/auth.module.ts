import { Module } from '@nestjs/common';
import { AuthUsecase } from './use-cases/auth.usecase';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthUsecase, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
