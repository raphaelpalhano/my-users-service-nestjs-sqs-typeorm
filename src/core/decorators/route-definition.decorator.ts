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
import { IConfigRoute } from './IRoute';

export function RouteDefinition(config: IConfigRoute): MethodDecorator {
  const { description, route, response } = config;

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

  console.log(
    `description: ${description} \n\n route: ${JSON.stringify(
      route,
    )} \n \nresponse ${JSON.stringify(response)}\n`,
  );

  const decorators = [
    SetMetadata('ROUTE_METADATA', {
      path: routePath,
      method: requestMethod,
      response,
    }),

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
      return applyDecorators(...decorators, Get(routePath));
    case 'POST':
      return applyDecorators(...decorators, Post(routePath));
    case 'PUT':
      return applyDecorators(...decorators, Put(routePath));
    case 'PATCH':
      return applyDecorators(...decorators, Patch(routePath));
    case 'DELETE':
      return applyDecorators(...decorators, Delete(routePath));
    default:
      throw new Error(`Invalid request method: ${route.method}`);
  }
}
