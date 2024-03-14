import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
  })
  lastname: string;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isFirstLogin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
