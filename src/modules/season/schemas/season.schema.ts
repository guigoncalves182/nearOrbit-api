import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SeasonDocument = HydratedDocument<Season>;

@Schema()
export class Season {
  private _id: string;

  @Prop()
  title: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
