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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { swaggerDocsConstants } from 'src/common/constants/swagger.constant';

@ApiTags('Project')
@Controller('/profiles/:profileId/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  /**
   * Retrieves all projects associated with a given profile.
   * @param profileId The ID of the profile.
   * @returns A promise resolving to an array of projects.
   */
  @Get()
  @ApiOperation({
    summary: swaggerDocsConstants.PROJECT.GET_ALL.SUMMARY,
    description: swaggerDocsConstants.PROJECT.GET_ALL.DESC,
  })
  async findAll(@Param('profileId') profileId: string): Promise<Project[]> {
    return this.projectService.findProjectsByProfileId(profileId);
  }

  /**
   * Retrieves a project by its ID.
   * @param projectId The ID of the project.
   * @returns A promise resolving to the project object.
   */
  @Get(':projectId')
  @ApiOperation({
    summary: swaggerDocsConstants.PROJECT.GET.SUMMARY,
    description: swaggerDocsConstants.PROJECT.GET.DESC,
  })
  async getProject(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.getProject(projectId);
  }

  /**
   * Creates multiple projects associated with a given profile.
   * @param profileId The ID of the profile to associate the projects with.
   * @param projectDataList An array of objects containing project data.
   * @returns A promise resolving to an array of created projects.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateProjectDto })
  @ApiOperation({
    summary: swaggerDocsConstants.PROJECT.CREATE.SUMMARY,
    description: swaggerDocsConstants.PROJECT.CREATE.DESC,
  })
  async createProjects(
    @Param('profileId') profileId: string,
    @Body() projectDataList: CreateProjectDto[],
  ): Promise<Project[]> {
    return this.projectService.createProjects(profileId, projectDataList);
  }

  /**
   * Updates a project by its ID.
   * @param projectId The ID of the project to update.
   * @param updateProjectDto The data to update the project with.
   * @returns A promise resolving to the updated project object.
   */
  @UseGuards(JwtAuthGuard)
  @Put(':projectId')
  @ApiBearerAuth()
  @ApiBody({ type: CreateProjectDto })
  @ApiOperation({
    summary: swaggerDocsConstants.PROJECT.UPDATE.SUMMARY,
    description: swaggerDocsConstants.PROJECT.UPDATE.DESC,
  })
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(projectId, updateProjectDto);
  }

  /**
   * Deletes a project by its ID.
   * @param profileId The ID of the profile associated with the project.
   * @param projectId The ID of the project to delete.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: swaggerDocsConstants.PROJECT.DELETE.SUMMARY,
    description: swaggerDocsConstants.PROJECT.DELETE.DESC,
  })
  @ApiBearerAuth()
  async deleteProject(
    @Param('profileId') profileId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProject(profileId, projectId);
  }
}
