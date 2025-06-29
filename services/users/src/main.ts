import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //whitelist: true will automatically remove properties that are not defined in the DTO.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //enable CORS
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
