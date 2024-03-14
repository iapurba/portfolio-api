import {
  Body,
  Controller,
  Get,
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

@ApiTags('project')
@Controller('project/:profileId')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('all')
  async findAll(@Param('profileId') profileId: string): Promise<Project[]> {
    return this.projectService.findProjectsByProfileId(profileId);
  }

  @Get(':projectId')
  async getProject(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.getProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Param('profileId') profileId: string,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(profileId, createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(projectId, updateProjectDto);
  }
}
