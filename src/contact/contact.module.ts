import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileModelModule } from 'src/profile/schemas/profile.model';
import { ContactModelModule } from './schemas/contact.model';

@Module({
  imports: [
    ProfileModule,
    ConfigModule,
    ContactModelModule,
    ProfileModelModule,
  ],
  providers: [ContactService, ProfileService],
  controllers: [ContactController],
})
export class ContactModule {}
