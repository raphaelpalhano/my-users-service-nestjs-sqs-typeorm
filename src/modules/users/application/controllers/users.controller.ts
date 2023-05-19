import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  RequestMethod,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RouteDefinition } from 'src/core/decorators/route-definition.decorator';
import { ListUsersDto } from '../dto/list-users.dto';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  FindUsersUsecase,
  ListUsersUsecase,
  UpdateUserUsecase,
} from '../use-cases';
import { LogDecorator } from 'src/core/decorators/logger.decorator';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createUserUsecase: CreateUsersUsecase,
    private readonly listUserUseCase: ListUsersUsecase,
    private readonly findUserUseCase: FindUsersUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly deleteUserUsecase: DeleteUsersUsecase,
  ) {}

  @RouteDefinition({
    description: 'Get specific user',
    route: {
      method: RequestMethod.GET,
      path: '/:id',
    },
    response: {
      status: HttpStatus.OK,
      type: {},
    },
  })
  public async show(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.findUserUseCase.execute({ where: { id } });
    return result;
  }

  @RouteDefinition({
    description: 'list users',
    route: {
      method: RequestMethod.GET,
      path: '/',
    },
    response: {
      status: HttpStatus.OK,
      type: ListUsersDto,
    },
  })
  @LogDecorator
  public async index() {
    return this.listUserUseCase.execute();
  }

  @RouteDefinition({
    description: 'create user',
    route: {
      method: RequestMethod.POST,
      path: '/',
    },
  })
  public async store(@Body() body: CreateUserDto) {
    return this.createUserUsecase.execute(body);
  }

  @RouteDefinition({
    description: 'Update user',
    route: {
      method: RequestMethod.PATCH,
      path: '/:id',
    },
  })
  public async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.updateUserUsecase.execute(id, body);
  }

  @RouteDefinition({
    description: 'Delete user',
    route: {
      method: RequestMethod.DELETE,
      path: '/:id',
    },
  })
  public async delete(@Param('id', new ParseIntPipe()) id: number) {
    this.deleteUserUsecase.execute(id);
  }
}
