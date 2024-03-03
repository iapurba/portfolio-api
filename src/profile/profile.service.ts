import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

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
      throw new NotFoundException();
    }
    return updatedProfile;
  }
}
