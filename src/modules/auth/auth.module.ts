import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthController } from './controllers';
import { AuthUsecase } from './use-cases';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRE_TOKEN },
    }),
  ],
  providers: [AuthUsecase, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
