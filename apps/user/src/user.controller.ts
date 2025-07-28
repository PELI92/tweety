import { Controller, Get, Param, Post, Body, NotFoundException, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Get(':username')
  @ApiOperation({ summary: 'Find user by username' })
  @ApiParam({ name: 'username', type: String })
  async findByUsername(@Param('username') username: string): Promise<UserDocument> {
    this.logger.log(`GET /users/username/${username}`);

    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
      },
    },
  })
  async createUser(@Body('username') username: string): Promise<UserDocument> {
    this.logger.log(`POST /users`);
    return this.userService.createUser({ username: username, bio: '', displayName: '' });
  }
}
