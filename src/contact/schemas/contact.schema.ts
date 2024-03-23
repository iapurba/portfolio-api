import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';

@Schema({ timestamps: true })
export class Contact extends Document {
  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true })
  senderEmail: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  toProfile: Profile;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
