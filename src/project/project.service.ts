import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/schemas/profile.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly profileService: ProfileService,
  ) {}

  private async findProfile(profileId: string): Promise<Profile> {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new NotFoundException('Invalid profile id');
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
      throw new NotFoundException();
    }
    return project;
  }

  async createProjects(
    profileId: string,
    projectDataList: CreateProjectDto[],
  ): Promise<Project[]> {
    const profile = await this.findProfile(profileId);
    if (!profile) {
      throw new NotFoundException();
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
      throw new NotFoundException();
    }
    return updatedProject;
  }
}
