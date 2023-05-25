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

@Controller('auth')
export class AuthController {
  constructor(private readonly authUsecase: AuthUsecase) {}

  @UseGuards(AuthGuard('local'))
  @RouteDefinition({
    description: 'authentication user route',
    route: {
      path: '/',
      method: RequestMethod.POST,
    },
    response: {
      status: HttpStatus.OK,
      type: '',
    },
  })
  public async login(@Req() req: any) {
    return this.authUsecase.login(req.user);
  }
}
