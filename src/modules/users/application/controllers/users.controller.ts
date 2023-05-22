import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  RequestMethod,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RouteDefinition } from 'src/core/decorators/route-definition.decorator';
import { ListUsersDto } from '../dto/list-users.dto';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  FindUsersUsecase,
  ListUsersUsecase,
  UpdateUserUsecase,
} from '../use-cases';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserDto } from '../dto/user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUsecase: CreateUsersUsecase,
    private readonly listUserUseCase: ListUsersUsecase,
    private readonly findUserUseCase: FindUsersUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly deleteUserUsecase: DeleteUsersUsecase,
  ) {}

  @UseGuards(JwtGuard)
  @RouteDefinition({
    description: 'Get specific user',
    route: {
      method: RequestMethod.GET,
      path: '/:id',
    },
    response: {
      status: HttpStatus.OK,
      type: '',
    },
  })
  public async show(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.findUserUseCase.execute({
      where: { id },
      select: [
        'id',
        'email',
        'name',
        'birthDate',
        'createdAt',
        'updatedAt',
        'age',
      ],
    });
    return result;
  }

  @UseGuards(JwtGuard)
  @RouteDefinition({
    description: 'lists users',
    route: {
      method: RequestMethod.GET,
      path: '/',
    },
    response: {
      status: HttpStatus.OK,
      type: ListUsersDto,
    },
  })
  public async index() {
    return this.listUserUseCase.execute();
  }

  @RouteDefinition({
    description: 'create user',
    route: {
      method: RequestMethod.POST,
      path: '/',
    },
    response: {
      status: HttpStatus.CREATED,
      type: 'CREATED',
    },
  })
  public async store(@Body() body: CreateUserDto) {
    return this.createUserUsecase.execute(body);
  }

  @UseGuards(JwtGuard)
  @RouteDefinition({
    description: 'Update user',
    route: {
      method: RequestMethod.PATCH,
      path: '/:id',
    },
    response: {
      status: HttpStatus.ACCEPTED,
      type: UserDto,
    },
  })
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.updateUserUsecase.execute(id, body);
    return user;
  }

  @UseGuards(JwtGuard)
  @RouteDefinition({
    description: 'Delete user',
    route: {
      method: RequestMethod.DELETE,
      path: '/:id',
    },
    response: {
      status: HttpStatus.OK,
      type: UserDto,
    },
  })
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteUserUsecase.execute(id);
  }
}
