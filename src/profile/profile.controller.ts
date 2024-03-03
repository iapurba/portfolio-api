import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @ApiBody({ description: 'Create Profile', type: CreateProfileDto })
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    this.profileService.updateProfile(id, updateProfileDto);
  }
}
