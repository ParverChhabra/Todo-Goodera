import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://todoparver.s3-website-us-east-1.amazonaws.com',
    methods:"GET,POST,PATCH,PUT,DELETE"});
  app.setGlobalPrefix('api');

  await app.listen(3000,"0.0.0.0");
}
bootstrap();
