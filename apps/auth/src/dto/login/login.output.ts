import { InputType } from '@nestjs/graphql';

@InputType()
export class LoginOutput {
  token!: string;
}
