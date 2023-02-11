import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as basicAuth from 'express-basic-auth'

import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion:true
    },
    disableErrorMessages: process.env.ENVIRONMENT === 'production'
  }));

  app.use(['/docs', '/docs-json'], basicAuth({
    challenge: true,
    users: {
      [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
    },
  }));

  if(process.env.NODE_ENV !== 'prod'){
    const config = new DocumentBuilder()
      .setTitle('API Carrito')
      .setDescription('Documentación API Carrito')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
