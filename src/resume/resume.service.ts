import {
  BadRequestException,
  ConflictException,
  Injectable,
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
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new BadRequestException(profileConstants.BAD_REQUEST);
    }
    const resume = await this.resumeModel.findOne({ profileId: profile._id });
    if (!resume) {
      throw new NotFoundException(resumeConstants.RESUME_NOT_FOUND);
    }
    return resume;
  }

  async createResume(
    profileId: string,
    resumeData: CreateResumeDto,
  ): Promise<Resume> {
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
  }

  async updateResume(
    profileId: string,
    resumeId: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new BadRequestException(profileConstants.BAD_REQUEST);
    }
    const updatedResume = await this.resumeModel.findByIdAndUpdate(
      resumeId,
      updateResumeDto,
      { new: true },
    );
    if (!updatedResume) {
      throw new NotFoundException(resumeConstants.RESUME_NOT_FOUND);
    }
    return updatedResume;
  }

  async deleteResume(profileId: string) {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new BadRequestException(profileConstants.BAD_REQUEST);
    }
    try {
      await this.resumeModel.findOneAndDelete({ profileId });
    } catch (error) {
      throw error;
    }
  }
}
