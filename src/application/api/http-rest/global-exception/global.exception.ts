import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    console.error(error); // Log the error for debugging

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (error instanceof BadRequestException) {
      const exceptionResponse = error.getResponse();
      let message = exceptionResponse;

      // If the error is a validation error (from class-validator), it could contain an array of messages
      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse.hasOwnProperty('message')
      ) {
        message = exceptionResponse['message'];
      }

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Bad Request',
        message, // Include the detailed error message
      });
    } else if (error instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Not Found',
        message: error.message,
      });
    } else {
      // Handle other types of errors
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Internal Server Error',
        message: error.message || 'Internal server error',
      });
    }
  }
}

// import {
//   Catch,
//   ExceptionFilter,
//   ArgumentsHost,
//   HttpStatus,
//   BadRequestException,
//   NotFoundException,
// } from '@nestjs/common';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(error: any, host: ArgumentsHost) {
//     console.error(error);

//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     if (error instanceof BadRequestException) {
//       response.status(HttpStatus.BAD_REQUEST).json({
//         statusCode: HttpStatus.BAD_REQUEST,
//         message: 'Not Found',
//         error: error.message,
//       });
//     } else if (error instanceof NotFoundException) {
//       response.status(HttpStatus.NOT_FOUND).json({
//         statusCode: HttpStatus.NOT_FOUND,
//         message: 'Not Found',
//         error: error.message,
//       });
//     } else {
//       // Handle other errors
//       response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: 'Internal server error',
//         error: error.message,
//       });
//     }
//   }
// }
