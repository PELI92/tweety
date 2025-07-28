import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  _id!: string;
  username!: string;
  displayName?: string;
  bio?: string;
}
