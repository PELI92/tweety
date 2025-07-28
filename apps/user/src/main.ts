import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('users/api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
