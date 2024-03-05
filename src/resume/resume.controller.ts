import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './schemas/resume.schema';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('resume')
@ApiTags('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get(':id')
  async getResume(@Param('id') id: string): Promise<Resume> {
    return this.resumeService.getResume(id);
  }

  @Post()
  createResume(@Body() createResumeDto: CreateResumeDto): Promise<Resume> {
    return this.resumeService.createResume(createResumeDto);
  }

  @Put(':id')
  async updateResume(
    @Param('id') id: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.updateResume(id, updateResumeDto);
  }
}
