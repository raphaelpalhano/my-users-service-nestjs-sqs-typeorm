import {
  Delete,
  Get,
  Patch,
  Post,
  Put,
  RequestMethod,
  SetMetadata,
  applyDecorators,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IConfigRoute } from './IRoute';

export function RouteDefinition(config: IConfigRoute): MethodDecorator {
  const { description, route, response, request } = config;

  let requestMethod: string;
  switch (route.method) {
    case RequestMethod.GET:
      requestMethod = 'GET';
      break;
    case RequestMethod.POST:
      requestMethod = 'POST';
      break;
    case RequestMethod.PUT:
      requestMethod = 'PUT';
      break;
    case RequestMethod.DELETE:
      requestMethod = 'DELETE';
      break;
    case RequestMethod.PATCH:
      requestMethod = 'PATCH';
      break;
    default:
      throw new Error(`Invalid request method: ${route.method}`);
  }

  const routePath = route.path || '';

  const decorators = [
    SetMetadata('ROUTE_METADATA', {
      path: routePath,
      method: requestMethod,
      response: response,
    }),
    ApiOperation({ summary: description }), // Definir descrição da rota no Swagger
    ApiResponse({
      status: response.status,
      description: response.description,
      type: response.type,
    }), // Definir a resposta da rota no Swagger
    UseInterceptors({
      // Crie um interceptor personalizado para modificar a resposta
      intercept(context, next) {
        const response = context.switchToHttp().getResponse();

        // Verifique se o status foi definido nos metadados
        const routeMetadata = Reflect.getMetadata(
          'ROUTE_METADATA',
          context.getHandler(),
        );
        const { response: routeResponse } = routeMetadata || {};

        if (routeResponse && routeResponse.status) {
          response.status(routeResponse.status); // Defina o status code na resposta
        }

        return next.handle();
      },
    }),
  ];

  switch (requestMethod) {
    case 'GET':
      return applyDecorators(
        ...decorators,
        Get(routePath),
        ApiBody({}), // Adicionar ApiBody vazio para GET (opcional)
      );
    case 'POST':
      return applyDecorators(
        ...decorators,
        Post(routePath),
        ApiBody({ type: request }),
      ); // Definir ApiBody para POST
    case 'PUT':
      return applyDecorators(
        ...decorators,
        Put(routePath),
        ApiBody({ type: request }),
      ); // Definir ApiBody para PUT
    case 'PATCH':
      return applyDecorators(
        ...decorators,
        Patch(routePath),
        ApiBody({ type: request }),
      ); // Definir ApiBody para PATCH
    case 'DELETE':
      return applyDecorators(
        ...decorators,
        Delete(routePath),
        ApiBody({ type: request }), // Adicionar ApiBody vazio para DELETE (opcional)
      );
    default:
      throw new Error(`Invalid request method: ${route.method}`);
  }
}
