import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  })
  profileId: Profile;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  tools: [string];

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  souceCodeUrl: string;

  @Prop()
  liveUrl: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
