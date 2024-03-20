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
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Project')
@Controller('/profiles/:profileId/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findAll(@Param('profileId') profileId: string): Promise<Project[]> {
    return this.projectService.findProjectsByProfileId(profileId);
  }

  @Get(':projectId')
  async getProject(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.getProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProjects(
    @Param('profileId') profileId: string,
    @Body() projectDataList: CreateProjectDto[],
  ): Promise<Project[]> {
    return this.projectService.createProjects(profileId, projectDataList);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(projectId, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProject(
    @Param('profileId') profileId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProject(profileId, projectId);
  }
}
