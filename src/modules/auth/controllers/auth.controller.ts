import {
  Controller,
  HttpStatus,
  Req,
  RequestMethod,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RouteDefinition } from 'src/core/decorators';
import { AuthUsecase } from '../use-cases/auth.usecase';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
@ApiTags('auth user')
export class AuthController {
  constructor(private readonly authUsecase: AuthUsecase) {}

  @UseGuards(AuthGuard('local'))
  @RouteDefinition({
    description: 'Autenticar o usuario gerando o token JWT',
    route: {
      path: '/',
      method: RequestMethod.POST,
    },
    request: LoginUserDto,
    response: {
      status: HttpStatus.OK,
      description: 'Response da rota',
      type: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
    },
  })
  public async login(@Req() req: any) {
    const userPayload: LoginUserDto = {
      email: req.user.email,
      password: req.user.password,
      id: req.user.id,
    };
    return this.authUsecase.login(userPayload);
  }
}
