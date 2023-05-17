import {
  Controller,
  HttpStatus,
  Param,
  RequestMethod,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RouteDefinition } from 'src/core/decorators/route-definition.decorator';
import { ListUserDto } from '../dto/list-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  @RouteDefinition({
    description: 'Get specific user',
    route: {
      method: RequestMethod.GET,
      path: '/:id/users',
    },
    response: {
      status: HttpStatus.OK,
      type: ListUserDto,
    },
  })
  public async retriveUser(
    @Param('id') userId: number,
    @Res() response: Response,
  ) {
    return response.json();
  }
}
