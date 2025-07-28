import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register/user/register.input';
import { RegisterOutput } from './dto/register/user/register.output';
import { LoginOutput } from './dto/login/login.output';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginInput } from './dto/login/login.input';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('register')
  @ApiOperation({ summary: 'Register a new user for Auth' })
  @ApiBody({ type: RegisterInput })
  async register(@Body() input: RegisterInput): Promise<RegisterOutput> {
    const { username, password } = input;
    this.logger.log(`POST /auth/register`);
    return await this.authService.registerUser(username, password);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find user by username' })
  @ApiBody({ type: LoginInput })
  async login(@Body() input: LoginInput): Promise<LoginOutput> {
    this.logger.log(`POST /auth/login`);
    return await this.authService.login(input.username, input.password);
  }
}
