import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';

export interface Job {
  title: string;
  startDate: string;
  endDate: string;
  jobType: string;
  description: string;
}

export interface WorkExperience {
  organization: string;
  jobs: Job[];
}

interface TechnicalSkill {
  name: string;
  rating: number;
}

export interface Education {
  institution: string;
  degree: string;
  stream: string;
  startYear: string;
  endYear: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issuedOn: string;
}

export type ResumeDocument = HydratedDocument<Resume>;

@Schema()
export class Resume {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  profileId: Profile;

  @Prop({ required: true })
  workExperiences: WorkExperience[];

  @Prop({
    required: true,
    type: [{ name: String, rating: Number }],
  })
  technicalSkills: TechnicalSkill[];

  @Prop({ required: true, type: [Object] })
  educations: Education[];

  @Prop({ required: true, type: [Object] })
  certifications: Certification[];
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
