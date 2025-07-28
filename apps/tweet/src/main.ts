import { NestFactory } from '@nestjs/core';
import { TweetModule } from './tweet.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(TweetModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
