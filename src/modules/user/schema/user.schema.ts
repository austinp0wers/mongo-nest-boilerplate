import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

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
    maxLength: 128,
  })
  phone: string;

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

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
