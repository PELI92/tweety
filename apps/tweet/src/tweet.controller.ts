import { Controller, Get } from '@nestjs/common';

@Controller()
export class TweetController {
  @Get('ping')
  ping(): string {
    return 'pong';
  }
}
