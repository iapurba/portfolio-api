import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      return this.profileModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getFullProfile(id: string): Promise<Profile> {
    try {
      const profile = await this.profileModel.findById(id);
      if (!profile) {
        throw new NotFoundException(profileConstants.NOT_FOUND);
      }
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const createProfile = new this.profileModel(createProfileDto);
      return await createProfile.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    try {
      const updatedProfile = await this.profileModel.findByIdAndUpdate(
        id,
        updateProfileDto,
        { new: true },
      );
      if (!updatedProfile) {
        throw new NotFoundException(profileConstants.NOT_FOUND);
      }
      return updatedProfile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProfile(id: string) {
    try {
      await this.profileModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
