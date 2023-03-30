import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    trim: true,
    minLength: 4,
    maxLength: 512,
  })
  email: string;

  @Prop({
    unique: true,
    trim: true,
    minLength: 8,
    maxLength: 128,
  })
  phoneNumber: string;

  @Prop({
    maxLength: 512,
    default: '',
  })
  password: string;

  @Prop({
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 256,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 256,
    index: true,
  })
  provider: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    default: null,
  })
  deletedAt: Date;

  @Prop({
    default: true,
  })
  visible: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
