import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [TweetController],
})
export class TweetModule {}
