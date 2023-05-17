import { RequestMethod, SetMetadata } from '@nestjs/common';
import { IConfigRoute } from './IRoute';

export function RouteDefinition(config: IConfigRoute): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    // Access the config values
    const { description, route, response } = config;

    // Get the appropriate request method string based on the route method
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
      // Add more cases for other request methods as needed
      default:
        throw new Error(`Invalid request method: ${route.method}`);
    }

    // Register the route metadata using the provided route method and path
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

    return descriptor;
  };
}
