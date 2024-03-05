import { Injectable, NotFoundException } from '@nestjs/common';
import { Resume } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) {}

  async getResume(id: string): Promise<Resume> {
    const resume = await this.resumeModel.findById(id);
    if (!resume) {
      throw new NotFoundException();
    }
    return resume;
  }

  async createResume(createResumeDto: CreateResumeDto): Promise<Resume> {
    const createdResume = new this.resumeModel(createResumeDto);
    return createdResume.save();
  }

  async updateResume(
    id: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    const updatedResume = await this.resumeModel.findByIdAndUpdate(
      id,
      updateResumeDto,
      { new: true },
    );
    if (!updatedResume) {
      throw new NotFoundException();
    }
    return updatedResume;
  }
}
