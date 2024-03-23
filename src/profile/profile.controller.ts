import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { profileConstants } from 'src/common/constants/profile.constant';
import { swaggerDocsConstants } from 'src/common/constants/swagger.constant';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  /**
   * Retrieves a profile by its ID.
   * @param id The ID of the profile to retrieve.
   * @returns The profile object.
   * @throws NotFoundException if the profile with the specified ID is not found.
   */
  @Get(':id')
  @ApiOperation({
    summary: swaggerDocsConstants.PROFILE.GET.SUMMARY,
    description: swaggerDocsConstants.PROFILE.GET.DESC,
  })
  async getProfile(@Param('id') id: string): Promise<Profile> {
    const profile = await this.profileService.getProfileById(id);
    if (!profile) {
      throw new NotFoundException(profileConstants.NOT_FOUND);
    }
    return profile;
  }

  /**
   * Creates a new profile.
   * @param createProfileDto The data to create the profile.
   * @returns The created profile object.
   * @throws BadRequestException if a profile with the same email already exists.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: swaggerDocsConstants.PROFILE.CREATE.SUMMARY,
    description: swaggerDocsConstants.PROFILE.CREATE.DESC,
  })
  @ApiBody({ type: CreateProfileDto })
  @ApiOkResponse({ description: 'Created Profile details', type: Profile })
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const existingProfile = await this.profileService.getProfileByEmail(
      createProfileDto.email,
    );
    if (existingProfile) {
      throw new BadRequestException(profileConstants.ALREADY_EXIST);
    }
    return this.profileService.createProfile(createProfileDto);
  }

  /**
   * Updates an existing profile.
   * @param id The ID of the profile to update.
   * @param updateProfileDto The data to update the profile.
   * @returns The updated profile object.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: swaggerDocsConstants.PROFILE.UPDATE.SUMMARY,
    description: swaggerDocsConstants.PROFILE.UPDATE.DESC,
  })
  @ApiBody({ type: CreateProfileDto })
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  /**
   * Deletes a profile by its ID.
   * @param id The ID of the profile to delete.
   * @returns No content.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    summary: swaggerDocsConstants.PROFILE.DELETE.SUMMARY,
    description: swaggerDocsConstants.PROFILE.DELETE.DESC,
  })
  async deleteProfile(@Param('id') id: string) {
    console.log(id);
    return this.profileService.deleteProfile(id);
  }
}
