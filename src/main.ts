import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // provide global validation with class-validator
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
