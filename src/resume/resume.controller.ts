import {
  Body,
  Controller,
  Get,
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

@Controller('resume')
@ApiTags('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get(':id')
  async getResume(@Param('id') id: string): Promise<Resume> {
    return this.resumeService.getResume(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createResume(@Body() createResumeDto: CreateResumeDto): Promise<Resume> {
    return this.resumeService.createResume(createResumeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateResume(
    @Param('id') id: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.updateResume(id, updateResumeDto);
  }
}
