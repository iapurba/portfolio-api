import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Resume } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ProfileService } from 'src/profile/profile.service';
import { profileConstants } from 'src/common/constants/profile.constant';
import { resumeConstants } from 'src/common/constants/resume.constant';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Retrieves a resume by profile ID.
   * @param profileId The ID of the profile to retrieve the resume for.
   * @returns A Promise that resolves to the retrieved resume.
   * @throws BadRequestException if the provided profile ID is invalid.
   * @throws NotFoundException if no resume is found for the provided profile ID.
   * @throws InternalServerErrorException if an unexpected error occurs during the operation.
   */
  async getResumeByProfileId(profileId: string): Promise<Resume> {
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
      const resume = await this.resumeModel.findOne({ profileId: profile._id });
      if (!resume) {
        throw new NotFoundException(resumeConstants.NOT_FOUND);
      }
      return resume;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Creates a new resume for a profile.
   * @param profileId The ID of the profile to create the resume for.
   * @param resumeData The data for creating the resume.
   * @returns A Promise that resolves to the created resume.
   * @throws BadRequestException if the provided profile ID is invalid.
   * @throws ConflictException if a resume already exists for the provided profile ID.
   * @throws InternalServerErrorException if an unexpected error occurs during the operation.
   */
  async createResume(
    profileId: string,
    resumeData: CreateResumeDto,
  ): Promise<Resume> {
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
      const resume = await this.resumeModel.findOne({ profileId });
      if (resume) {
        throw new ConflictException(resumeConstants.ALREAY_EXIST);
      }
      const createdResume = new this.resumeModel({
        ...resumeData,
        profileId,
      });
      return createdResume.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Updates an existing resume for a profile.
   * @param profileId The ID of the profile to update the resume for.
   * @param updateResumeDto The data for updating the resume.
   * @returns A Promise that resolves to the updated resume.
   * @throws BadRequestException if the provided profile ID is invalid.
   * @throws NotFoundException if no resume is found for the provided profile ID.
   * @throws InternalServerErrorException if an unexpected error occurs during the operation.
   */
  async updateResume(
    profileId: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    try {
      const profile = await this.profileService.getProfileById(profileId);
      if (!profile) {
        throw new BadRequestException(profileConstants.BAD_REQUEST);
      }
      const updatedResume = await this.resumeModel.findOneAndUpdate(
        { profileId: profileId },
        updateResumeDto,
        { new: true },
      );
      if (!updatedResume) {
        throw new NotFoundException(resumeConstants.NOT_FOUND);
      }
      return updatedResume;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Deletes a resume for a profile.
   * @param profileId The ID of the profile to delete the resume for.
   * @throws BadRequestException if the provided profile ID is invalid.
   * @throws InternalServerErrorException if an unexpected error occurs during the operation.
   */
  async deleteResume(profileId: string) {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new BadRequestException(profileConstants.BAD_REQUEST);
    }
    try {
      await this.resumeModel.findOneAndDelete({ profileId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
