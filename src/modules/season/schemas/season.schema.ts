import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SeasonDocument = HydratedDocument<Season>;

@Schema()
export class Season extends Document {
  @Prop()
  title: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
