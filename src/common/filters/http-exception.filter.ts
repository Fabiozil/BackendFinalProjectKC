import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Status } from '../dto/responses.dto';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorsList = (response: {errors?:[], message?:[]}): Array<Object> => {
  if (response.errors) {
    return response.errors; 
  } else if (response.message) {
    if (response.message.map) {
      let errors = response.message.map((val) => {
        return {
          "message": val,
          "field": val.split(' ')[0],
          "code": 422
        }
      })
      return errors;  
    }else{
      return response.message
    }
    
  } else {
    return [];
  }
};

export const getErrorMessage = (exception: unknown): string => {
  return String(exception);
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = getStatusCode(exception);
    const message = getErrorMessage(exception);
    const errors = getErrorsList(exception.getResponse())
    // console.log(exception)
    response
      .status(status)
      .json({
        status: Status.error,
        statusCode: status,
        timestamp: new Date().toISOString(),
        message,
        errors
      });
  }
}