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

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

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

  @Prop({ required: true })
  profileImageUrl: string;

  @Prop({ required: true })
  bioImageUrl: string;

  @Prop({ required: true })
  downloadCvUrl: string;

  @Prop({ required: false, type: Object })
  autoEmailCredentials: {
    email: string;
    passcode: string;
  };
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
