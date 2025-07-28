import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserModel } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello from Tweety';
  }

  @Query(() => UserModel, { nullable: true })
  async findUserByUsername(@Args('username') username: string): Promise<User | null> {
    return this.userService.findByUsername(username);
  }
}
