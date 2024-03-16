import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface ContactDetails {
  address: string;
  email: string;
  phone: string;
}

interface SocialAccounts {
  linkedIn?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
}

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  intro: string;

  @Prop({ required: true, type: [String] })
  jobs: string[];

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true, type: Object })
  contactDetails: ContactDetails;

  @Prop({ type: Object })
  socialAccounts: SocialAccounts;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
