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

  /**
   * Retrieves a profile by its ID.
   * @param id The ID of the profile to retrieve.
   * @returns A promise that resolves to the profile if found, or null if not found.
   * @throws InternalServerErrorException if there is an error while retrieving the profile.
   */
  async getProfileById(id: string): Promise<Profile | null> {
    try {
      return this.profileModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Retrieves a profile by its email address.
   * @param email The email address of the profile to retrieve.
   * @returns A promise that resolves to the profile if found, or null if not found.
   * @throws InternalServerErrorException if there is an error while retrieving the profile.
   */
  async getProfileByEmail(email: string): Promise<Profile | null> {
    try {
      return this.profileModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Retrieves a profile by its ID, throwing a NotFoundException if not found.
   * @param id The ID of the profile to retrieve.
   * @returns A promise that resolves to the profile.
   * @throws NotFoundException if the profile is not found.
   * @throws InternalServerErrorException if there is an error while retrieving the profile.
   */
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

  /**
   * Creates a new profile.
   * @param createProfileDto The data for creating the profile.
   * @returns A promise that resolves to the created profile.
   * @throws InternalServerErrorException if there is an error while creating the profile.
   */
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const createProfile = new this.profileModel(createProfileDto);
      return await createProfile.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Updates an existing profile.
   * @param id The ID of the profile to update.
   * @param updateProfileDto The data for updating the profile.
   * @returns A promise that resolves to the updated profile.
   * @throws NotFoundException if the profile is not found.
   * @throws InternalServerErrorException if there is an error while updating the profile.
   */
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

  /**
   * Deletes a profile by its ID.
   * @param id The ID of the profile to delete.
   * @throws InternalServerErrorException if there is an error while deleting the profile.
   */
  async deleteProfile(id: string) {
    try {
      await this.profileModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
