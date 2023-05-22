import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUsecase } from '../use-cases/auth.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UNAUTHORIZED } from 'src/core/domain/constants/users-exceptions.domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authUsecase: AuthUsecase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authUsecase.validateUser(email, password);
    if (!user) {
      throw new HttpException(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
