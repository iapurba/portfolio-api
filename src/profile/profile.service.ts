import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { profileConstants } from 'src/common/constants/profile.constant';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async getProfileById(id: string): Promise<Profile | null> {
    return this.profileModel.findById(id).exec();
  }

  async getFullProfile(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id);
    if (!profile) {
      throw new NotFoundException(profileConstants.PROFILE_NOT_FOUND);
    }
    return profile;
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const createProfile = new this.profileModel(createProfileDto);
    return createProfile.save();
  }

  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const updatedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { new: true },
    );
    if (!updatedProfile) {
      throw new NotFoundException(profileConstants.PROFILE_NOT_FOUND);
    }
    return updatedProfile;
  }

  async deleteProfile(id: string) {
    try {
      await this.profileModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
