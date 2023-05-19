import {
  Delete,
  Get,
  Patch,
  Post,
  Put,
  RequestMethod,
  SetMetadata,
} from '@nestjs/common';
import { IConfigRoute } from './IRoute';

export function RouteDefinition(config: IConfigRoute): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
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
    SetMetadata('ROUTE_METADATA', {
      path: routePath,
      method: requestMethod,
      response,
    })(target, propertyKey, descriptor);

    console.log(`Route Definition: ${description}`);
    console.log(`Method: ${requestMethod}`);
    console.log(`Path: ${routePath}`);
    if (response) {
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Type: ${response.type}`);
    }

    // Adiciona o decorator apropriado com o método fornecido

    switch (requestMethod) {
      case 'GET':
        return Reflect.decorate(
          [SetMetadata('ROUTE_HANDLER', true), Get(routePath)],
          target,
          propertyKey,
          descriptor,
        );
      case 'POST':
        return Reflect.decorate(
          [SetMetadata('ROUTE_HANDLER', true), Post(routePath)],
          target,
          propertyKey,
          descriptor,
        );
      case 'PUT':
        return Reflect.decorate(
          [SetMetadata('ROUTE_HANDLER', true), Put(routePath)],
          target,
          propertyKey,
          descriptor,
        );
      case 'PATCH':
        return Reflect.decorate(
          [SetMetadata('ROUTE_HANDLER', true), Patch(routePath)],
          target,
          propertyKey,
          descriptor,
        );
      case 'DELETE':
        return Reflect.decorate(
          [SetMetadata('ROUTE_HANDLER', true), Delete(routePath)],
          target,
          propertyKey,
          descriptor,
        );
      default:
        throw new Error(`Invalid request method: ${route.method}`);
    }

    return descriptor;
  };
}
