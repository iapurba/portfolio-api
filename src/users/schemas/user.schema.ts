import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enums/role.enum';

@Schema({ timestamps: true })
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

  @Prop({
    type: String,
    enum: [UserRole.ADMIN, UserRole.USER],
    default: UserRole.USER,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
