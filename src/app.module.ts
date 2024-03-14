import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeModule } from './resume/resume.module';
import { ProjectModule } from './project/project.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'),
    ProfileModule,
    ResumeModule,
    ProjectModule,
    ContactModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
