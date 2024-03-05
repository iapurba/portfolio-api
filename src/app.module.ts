import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeModule } from './resume/resume.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'),
    ResumeModule,
    ProjectModule,
  ],
})
export class AppModule {}
