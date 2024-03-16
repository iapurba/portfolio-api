import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileModelModule } from './schemas/profile.model';

@Module({
  imports: [ProfileModelModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService, ProfileModelModule],
})
export class ProfileModule {}
