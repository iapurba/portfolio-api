import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

interface ContactDetails {
  address: string;
  email: string;
  phone: string;
}

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  intro: string;

  @Prop({ required: true, type: [String] })
  jobs: string[];

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true, type: Object })
  contactDetails: ContactDetails;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
