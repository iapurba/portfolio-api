import { Injectable, NotFoundException } from '@nestjs/common';
import { Resume } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private readonly profileService: ProfileService,
  ) {}

  async getResumeByProfileId(profileId: string): Promise<Resume> {
    const profile = await this.profileService.getProfileById(profileId);
    if (!profile) {
      throw new NotFoundException();
    }
    const resume = await this.resumeModel.findOne({ profileId: profile._id });
    if (!resume) {
      throw new NotFoundException();
    }
    return resume;
  }

  async createResume(
    profileId: string,
    resumeData: CreateResumeDto,
  ): Promise<Resume> {
    const createdResume = new this.resumeModel({
      ...resumeData,
      profileId,
    });
    return createdResume.save();
  }

  async updateResume(
    resumeId: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    const updatedResume = await this.resumeModel.findByIdAndUpdate(
      resumeId,
      updateResumeDto,
      { new: true },
    );
    if (!updatedResume) {
      throw new NotFoundException();
    }
    return updatedResume;
  }
}
