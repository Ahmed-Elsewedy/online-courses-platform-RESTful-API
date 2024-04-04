import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './global-filters/all-exceptions.filter';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(
    new HttpExceptionFilter(app.get(ConfigService)),
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
  )

  await app.listen(3000);
}
bootstrap();
