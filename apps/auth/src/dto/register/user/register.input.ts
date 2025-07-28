import { Expose } from 'class-transformer';

@Expose()
export class RegisterInput {
  username!: string;
  password!: string;
}
