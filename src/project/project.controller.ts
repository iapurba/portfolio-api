import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('project')
@Controller('project/:profileId')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('all')
  async findAll(@Param('profileId') profileId: string): Promise<Project[]> {
    return this.projectService.findProjectsByProfileId(profileId);
  }

  @Get(':projectId')
  async getProfile(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.getProject(projectId);
  }

  @Post()
  async createProject(
    @Param('profileId') profileId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(profileId, createProjectDto);
  }

  @Put(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(projectId, updateProjectDto);
  }
}
