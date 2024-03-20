import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { profileConstants } from 'src/common/constants/profile.constant';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<Profile> {
    const profile = await this.profileService.getProfileById(id);
    if (!profile) {
      throw new NotFoundException(profileConstants.PROFILE_NOT_FOUND);
    }
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ description: 'Create Profile', type: CreateProfileDto })
  @ApiOkResponse({ description: 'Created Profile details', type: Profile })
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }
}
