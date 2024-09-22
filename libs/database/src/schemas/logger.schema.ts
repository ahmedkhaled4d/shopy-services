import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoggerDocument = Logger & Document;

@Schema({ timestamps: true })
export class Logger {
  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  body: any;

  @Prop()
  user: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop()
  statusMessage: string;
}

export const LoggerSchema = SchemaFactory.createForClass(Logger);
