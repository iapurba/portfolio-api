import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/schemas/profile.schema';
import { profileConstants } from 'src/common/constants/profile.constant';
import { projectConstants } from 'src/common/constants/project.constant';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly profileService: ProfileService,
  ) {}

  private async findProfile(profileId: string): Promise<Profile> {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new BadRequestException(profileConstants.BAD_REQUEST);
    }
    return profile;
  }

  async findProjectsByProfileId(profileId: string): Promise<Project[]> {
    const profile = await this.findProfile(profileId);
    const projects = await this.projectModel.find({ profileId: profile });
    return projects ?? [];
  }

  async getProject(projectId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException(projectConstants.PROJECT_NOT_FOUND);
    }
    return project;
  }

  async createProjects(
    profileId: string,
    projectDataList: CreateProjectDto[],
  ): Promise<Project[]> {
    const profile = await this.findProfile(profileId);
    if (!profile) {
      throw new NotFoundException(profileConstants.PROFILE_NOT_FOUND);
    }
    const createdProjects = await this.projectModel.insertMany(
      projectDataList.map((data: CreateProjectDto) => ({
        ...data,
        profileId: profile._id,
      })),
    );
    return createdProjects;
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      projectId,
      updateProjectDto,
      { new: true },
    );
    if (!updatedProject) {
      throw new NotFoundException(projectConstants.PROJECT_NOT_FOUND);
    }
    return updatedProject;
  }

  async deleteProject(profileId: string, projectId: string) {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new BadRequestException(profileConstants.BAD_REQUEST);
    }
    try {
      await this.projectModel.findByIdAndDelete(projectId);
    } catch (error) {
      throw error;
    }
  }
}
