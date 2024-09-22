import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  timezone: string;

  @Prop({ default: 'basic' })
  plan: string;

  @Prop({ type: Object, required: false })
  tempToken?: {
    token?: string;
    expire?: Date;
  };

  @Prop({ type: Object, required: false, default: { name: '', logo: '' } })
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

  @Prop({
    type: Object,
    required: false,
    default: { isShowLogo: false, isShowEmail: false },
  })
  invoice?: {
    isShowLogo: boolean;
    isShowEmail: boolean;
    header: string;
    footer: string;
  };

  @Prop()
  refreshToken?: string;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
