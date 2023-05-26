import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  RequestMethod,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUsersUsecase,
  DeleteUsersUsecase,
  FindUsersUsecase,
  ListUsersUsecase,
  UpdateUsersUsecase,
} from '../use-cases';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { JwtGuard } from 'src/modules/auth/jwt.guard';
import { UserDto } from '../dto/user.dto';
import { RouteDefinition } from 'src/core/decorators';
import { ApiTags } from '@nestjs/swagger';
import { DeletedUserDto } from '../dto/deleted-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createUserUsecase: CreateUsersUsecase,
    private readonly listUserUseCase: ListUsersUsecase,
    private readonly findUserUseCase: FindUsersUsecase,
    private readonly updateUserUsecase: UpdateUsersUsecase,
    private readonly deleteUserUsecase: DeleteUsersUsecase,
  ) {}

  @UseGuards(JwtGuard)
  @RouteDefinition({
    description: 'Buscar um usuario pelo id',
    route: {
      method: RequestMethod.GET,
      path: '/:id',
    },
    response: {
      status: HttpStatus.OK,
      description: 'Response da rota',
      type: UserDto,
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
    description: 'listar usuarios cadastrados',
    route: {
      method: RequestMethod.GET,
      path: '/',
    },
    response: {
      status: HttpStatus.OK,
      description: 'Response da rota',
      type: UserDto,
    },
  })
  public async index() {
    return this.listUserUseCase.execute();
  }

  @RouteDefinition({
    description: 'Criar um novo usuario',
    route: {
      method: RequestMethod.POST,
      path: '/',
    },
    request: CreateUserDto,
    response: {
      status: HttpStatus.CREATED,
      description: 'Response da rota',
      type: UserDto,
    },
  })
  public async store(@Body() body: CreateUserDto) {
    return this.createUserUsecase.execute(body);
  }

  @UseGuards(JwtGuard)
  @RouteDefinition({
    description: 'Atualizar dados do usuario',
    route: {
      method: RequestMethod.PATCH,
      path: '/:id',
    },
    request: UpdateUserDto,
    response: {
      status: HttpStatus.ACCEPTED,
      description: 'Response da rota',
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
    description: 'Deletar o usuario',
    route: {
      method: RequestMethod.DELETE,
      path: '/:id',
    },
    response: {
      status: HttpStatus.OK,
      description: 'Response da rota',
      type: DeletedUserDto,
    },
  })
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteUserUsecase.execute(id);
  }
}
