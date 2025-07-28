import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  username!: string;
  displayName?: string;
  bio?: string;
}
