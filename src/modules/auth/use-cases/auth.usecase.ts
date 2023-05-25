import { Injectable } from '@nestjs/common';
import { FindUsersUsecase } from 'src/modules/users/application/use-cases';

import { compareSync } from 'bcrypt';
import { UserEntity } from 'src/modules/users/database/typeorm/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUsecase {
  constructor(
    private readonly findUsersUsecase: FindUsersUsecase,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.findUsersUsecase.execute({ where: { email } });
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
