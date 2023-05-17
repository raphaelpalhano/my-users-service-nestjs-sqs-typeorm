import { HttpStatus, RequestMethod } from '@nestjs/common';

export interface IRoute {
  method: RequestMethod;
  path?: string[] | string;
}

export interface IConfigRoute {
  description: string;
  route: IRoute;
  response?: {
    status: HttpStatus;
    type: any;
  };
}
