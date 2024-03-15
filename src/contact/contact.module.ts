import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from 'src/profile/profile.module';
import { Profile, ProfileSchema } from 'src/profile/schemas/profile.schema';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [
    ProfileModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ContactService, ProfileService],
  controllers: [ContactController],
})
export class ContactModule {}
