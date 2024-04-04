import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        let httpStatus = exception.status
        const responseBody = {
            status: exception.status || 400,
            message: exception.message,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}