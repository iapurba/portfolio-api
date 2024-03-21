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

  @Get()
  @ApiOperation({
    summary: swaggerDocsConstants.RESUME.GET.SUMMARY,
    description: swaggerDocsConstants.RESUME.GET.DESC,
  })
  async getResume(@Param('profileId') profileId: string): Promise<Resume> {
    return this.resumeService.getResumeByProfileId(profileId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
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

  @UseGuards(JwtAuthGuard)
  @Put()
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
