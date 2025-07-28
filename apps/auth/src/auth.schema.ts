import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ required: true })
  hashedPassword!: string;

  @Prop()
  failedAttempts: number = 0;

  @Prop()
  lastLoginAt?: Date;

  @Prop({ nullable: true })
  lockedUntil?: Date;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);
