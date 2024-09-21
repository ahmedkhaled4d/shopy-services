import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  timezone: string;

  @Prop({ default: 'basic' })
  plan: string;

  @Prop()
  tempToken?: {
    token?: string;
    expire?: Date;
  };

  @Prop({ default: { plan: 'basic' } })
  store?: {
    name?: string;
    logo?: string;
    link?: string;
    region?: string;
    category?: string;
    currency?: string;
    taxs: {
      rate: number;
      method: string;
      id: string;
    };
    communities: {
      whatsapp_link: string;
      telegram_link: string;
      instegram_link: string;
      facebook_link: string;
    };
  };

  @Prop({ default: { isShowLogo: false, isShowEmail: false } })
  invoice?: {
    isShowLogo: boolean;
    isShowEmail: boolean;
    header: string;
    footer: string;
  };

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
