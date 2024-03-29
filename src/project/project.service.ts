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
  /**
   * Finds a profile by its ID.
   * If the profile does not exist, throws a BadRequestException.
   * If an unexpected error occurs during the process, throws an InternalServerErrorException.
   * @param profileId The ID of the profile to find.
   * @returns A promise resolving to the found profile.
   * @throws BadRequestException If the profile with the given ID does not exist.
   * @throws InternalServerErrorException If an unexpected error occurs.
   */
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

  /**
   * Finds all projects associated with a given profile ID.
   * If the profile with the provided ID does not exist, throws a BadRequestException.
   * If an unexpected error occurs during the process, throws an InternalServerErrorException.
   * @param profileId The ID of the profile to find projects for.
   * @returns A promise resolving to an array of projects associated with the profile.
   * @throws BadRequestException If the profile with the given ID does not exist.
   * @throws InternalServerErrorException If an unexpected error occurs.
   */
  async findProjectsByProfileId(profileId: string): Promise<Project[]> {
    try {
      const profile = await this.findProfile(profileId);
      const projects = await this.projectModel.find({ profileId: profile });
      return projects ?? [];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Retrieves a project by its ID.
   * If the project with the provided ID does not exist, throws a NotFoundException.
   * If an unexpected error occurs during the process, throws an InternalServerErrorException.
   * @param profileId The ID of the profile associated with the project.
   * @param projectId The ID of the project to retrieve.
   * @returns A promise resolving to the project object if found.
   * @throws NotFoundException If the project with the given ID does not exist.
   * @throws InternalServerErrorException If an unexpected error occurs.
   */
  async getProject(profileId: string, projectId: string): Promise<Project> {
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
      const project = await this.projectModel.findById(projectId);
      if (!project) {
        throw new NotFoundException(projectConstants.NOT_FOUND);
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Creates multiple projects associated with a given profile ID.
   * If the profile with the provided ID does not exist, throws a NotFoundException.
   * If an unexpected error occurs during the process, throws an InternalServerErrorException.
   * @param profileId The ID of the profile to associate the projects with.
   * @param projectDataList An array of objects containing project data.
   * @returns A promise resolving to an array of created projects.
   * @throws NotFoundException If the profile with the given ID does not exist.
   * @throws InternalServerErrorException If an unexpected error occurs.
   */
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

  /**
   * Updates a project by its ID.
   * If the project with the provided ID does not exist, throws a NotFoundException.
   * If an unexpected error occurs during the process, throws an InternalServerErrorException.
   * @param profileId The ID of the profile associated with the project.
   * @param projectId The ID of the project to update.
   * @param updateProjectDto The data to update the project with.
   * @returns A promise resolving to the updated project object.
   * @throws NotFoundException If the project with the given ID does not exist.
   * @throws InternalServerErrorException If an unexpected error occurs.
   */
  async updateProject(
    profileId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
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

  /**
   * Deletes a project by its ID.
   * If the profile with the provided ID does not exist, throws a BadRequestException.
   * If an unexpected error occurs during the process, throws an InternalServerErrorException.
   * @param profileId The ID of the profile associated with the project.
   * @param projectId The ID of the project to delete.
   * @throws BadRequestException If the profile with the given ID does not exist.
   * @throws InternalServerErrorException If an unexpected error occurs.
   */
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
