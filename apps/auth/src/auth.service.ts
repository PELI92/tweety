import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth, AuthDocument } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserHttpService } from './external/user-http.service';
import { RegisterOutput } from './dto/register/user/register.output';
import { LoginOutput } from './dto/login/login.output';

const MAX_LOGIN_RETRIES = 5;
const LOCKED_OUT_IN_MILLISECONDS = 900000; // 15 minutes

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private model: Model<AuthDocument>,
    private readonly userService: UserHttpService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(username: string, plainPassword: string): Promise<RegisterOutput> {
    const existing = await this.userService.findByUsername(username);
    if (existing) {
      throw new Error('UserName already exists');
    }

    const user = await this.userService.createUser(username);

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const auth = await this.model.create({
      userId: user._id,
      hashedPassword,
    });

    await auth.save();

    return { _id: user._id, username: user.username };
  }

  async login(username: string, password: string): Promise<LoginOutput> {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Account(User) NOT found');

    const auth = await this.model.findOne({ userId: user._id }).exec();
    if (!auth) throw new UnauthorizedException('Account(Auth) NOT found');

    const now = new Date();
    if (auth.lockedUntil && auth.lockedUntil > now) {
      throw new UnauthorizedException('Account is temporarily locked');
    }

    const match = await bcrypt.compare(password, auth.hashedPassword);

    if (!match) {
      auth.failedAttempts += 1;
      if (auth.failedAttempts >= MAX_LOGIN_RETRIES) {
        auth.lockedUntil = new Date(Date.now() + LOCKED_OUT_IN_MILLISECONDS);
      }
      await auth.save();
      throw new UnauthorizedException('Invalid credentials');
    }

    auth.failedAttempts = 0;
    auth.lockedUntil = undefined;
    auth.lastLoginAt = now;
    await auth.save();

    const payload = {
      sub: user._id,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }
}
