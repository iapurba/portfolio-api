import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './schemas/resume.schema';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { swaggerDocsConstants } from 'src/common/constants/swagger.constant';

@Controller('/profiles/:profileId/resume')
@ApiTags('Resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  /**
   * Retrieves the resume associated with the provided profile ID.
   * @param profileId The ID of the profile whose resume is to be retrieved.
   * @returns A Promise that resolves to the retrieved resume.
   */
  @Get()
  @ApiOperation({
    summary: swaggerDocsConstants.RESUME.GET.SUMMARY,
    description: swaggerDocsConstants.RESUME.GET.DESC,
  })
  async getResume(@Param('profileId') profileId: string): Promise<Resume> {
    return this.resumeService.getResumeByProfileId(profileId);
  }

  /**
   * Creates a new resume for the specified profile.
   * @param profileId The ID of the profile for which the resume is to be created.
   * @param createResumeDto The data to create the new resume.
   * @returns A Promise that resolves to the created resume.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: swaggerDocsConstants.RESUME.CREATE.SUMMARY,
    description: swaggerDocsConstants.RESUME.CREATE.DESC,
  })
  createResume(
    @Param('profileId') profileId: string,
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.createResume(profileId, createResumeDto);
  }

  /**
   * Updates the resume associated with the specified profile.
   * @param profileId The ID of the profile whose resume is to be updated.
   * @param updateResumeDto The data to update the resume.
   * @returns A Promise that resolves to the updated resume.
   */
  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: swaggerDocsConstants.RESUME.UPDATE.SUMMARY,
    description: swaggerDocsConstants.RESUME.UPDATE.DESC,
  })
  @ApiBody({ type: CreateResumeDto })
  async updateResume(
    @Param('profileId') profileId: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.updateResume(profileId, updateResumeDto);
  }

  /**
   * Deletes the resume associated with the specified profile.
   * @param profileId The ID of the profile whose resume is to be deleted.
   * @returns A Promise that resolves when the resume is successfully deleted.
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({
    summary: swaggerDocsConstants.RESUME.DELETE.SUMMARY,
    description: swaggerDocsConstants.RESUME.DELETE.DESC,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteResume(@Param('profileId') profileId: string) {
    return this.resumeService.deleteResume(profileId);
  }
}
