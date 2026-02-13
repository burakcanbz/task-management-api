import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const statusCode: number = exception instanceof HttpException ? exception.getStatus() : 500;
        const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

        response.status(statusCode).json({
            success: false,
            error: true,
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            message:
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : (exceptionResponse as any).message,
        });
    }
}
