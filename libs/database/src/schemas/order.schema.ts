import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Product } from './catalog.schema';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  DRAFT = 'draft',
  INIT = 'init',
  DELIVERY = 'delivery',
  ACCEPT = 'accept',
  REJECT = 'reject',
}

@Schema({ timestamps: true })
export class Order {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
    required: true,
  })
  status: OrderStatus;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Product',
  })
  items: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
