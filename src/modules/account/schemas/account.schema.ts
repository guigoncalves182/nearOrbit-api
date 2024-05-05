import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Season } from 'src/modules/season/schemas/season.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ required: true })
  power: number;

  @Prop({ required: true })
  speed: number;

  @Prop({ required: true })
  maneuver: number;

  @Prop({ type: String, ref: Season.name, required: true })
  season: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
