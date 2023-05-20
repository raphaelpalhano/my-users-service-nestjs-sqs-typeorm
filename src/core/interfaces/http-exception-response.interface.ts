export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
  typeError: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  timeStamp: Date;
}
