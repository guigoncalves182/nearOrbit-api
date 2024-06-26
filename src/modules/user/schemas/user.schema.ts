import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Account } from 'src/modules/account/schemas/account.schema';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], ref: Account.name })
  account: string[];

  @Prop()
  currency: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
