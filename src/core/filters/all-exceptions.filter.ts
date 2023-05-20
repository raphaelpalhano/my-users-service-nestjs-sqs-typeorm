import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from '../interfaces/http-exception-response.interface';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilters implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string | object;
    let type: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;

      type =
        (errorResponse as HttpExceptionResponse).typeError || exception.name;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occured!';
    }
    const errorResponse = this.getErrorResponse(
      status,
      errorMessage,
      type,
      request,
    );
    const errorLog = this.logError(errorResponse, request, exception);
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    type: string,
    error: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: error,
    path: request.url,
    typeError: type,
    timeStamp: new Date(),
  });

  private logError = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, error, typeError } = errorResponse;
    const { method, url } = request;
    const errorLog = `- Response Code: ${statusCode} - Method: ${method} - URL: ${url} \n
    - ErrorResponse: ${JSON.stringify(errorResponse)}\n
    User: ${JSON.stringify(request.user) ?? 'Not signed in'}\n
    - typeError: ${typeError} \n\n  - ${
      exception instanceof HttpException ? exception.stack : error
    }\n
   `;
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  };
}
