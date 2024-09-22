import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Vendor } from './vendor.schema';

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service',
}

export type CategoryDocument = Category & Document;
export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Category {
  _id: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  })
  vendor: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

@Schema({ timestamps: true })
export class Product {
  _id: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  })
  vendor: Vendor;

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  sku: string;

  @Prop({
    type: String,
    enum: ProductType,
    default: ProductType.PHYSICAL,
    required: true,
  })
  type: ProductType;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: 0, min: 0 })
  stock: number;

  @Prop()
  maxOrder: number;

  @Prop()
  minOrder: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    // required: true,
  })
  category: Category;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: true })
  isTrackStock: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export const ProductSchema = SchemaFactory.createForClass(Product);
