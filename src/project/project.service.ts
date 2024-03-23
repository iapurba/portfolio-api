import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findProjectsByProfileId(profileId: string): Promise<Project[]> {
    try {
      const profile = await this.findProfile(profileId);
      const projects = await this.projectModel.find({ profileId: profile });
      return projects ?? [];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProject(projectId: string): Promise<Project> {
    try {
      const project = await this.projectModel.findById(projectId);
      if (!project) {
        throw new NotFoundException(projectConstants.NOT_FOUND);
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createProjects(
    profileId: string,
    projectDataList: CreateProjectDto[],
  ): Promise<Project[]> {
    try {
      const profile = await this.findProfile(profileId);
      if (!profile) {
        throw new NotFoundException(profileConstants.NOT_FOUND);
      }
      const createdProjects = await this.projectModel.insertMany(
        projectDataList.map((data: CreateProjectDto) => ({
          ...data,
          profileId: profile._id,
        })),
      );
      return createdProjects;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    try {
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        projectId,
        updateProjectDto,
        { new: true },
      );
      if (!updatedProject) {
        throw new NotFoundException(projectConstants.NOT_FOUND);
      }
      return updatedProject;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProject(profileId: string, projectId: string) {
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
      await this.projectModel.findByIdAndDelete(projectId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
