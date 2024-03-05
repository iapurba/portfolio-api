import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  profileId: Profile;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  toolsUsed: [string];

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  souceCodeUrl: string;

  @Prop()
  liveUrl: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
