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
