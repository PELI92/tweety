import { Expose } from 'class-transformer';

@Expose()
export class RegisterOutput {
  _id!: string;
  username!: string;
}
