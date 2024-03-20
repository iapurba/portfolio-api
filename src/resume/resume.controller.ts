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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/profiles/:profileId/resume')
@ApiTags('Resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get()
  async getResume(@Param('profileId') profileId: string): Promise<Resume> {
    return this.resumeService.getResumeByProfileId(profileId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createResume(
    @Param('profileId') profileId: string,
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.createResume(profileId, createResumeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':resumeId')
  async updateResume(
    @Param('profileId') profileId: string,
    @Param('resumeId') resumeId: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.updateResume(
      profileId,
      resumeId,
      updateResumeDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteResume(@Param('profileId') profileId: string) {
    return this.resumeService.deleteResume(profileId);
  }
}
