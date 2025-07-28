import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('API for managing authorizations')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('auth/api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
