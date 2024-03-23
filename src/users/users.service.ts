import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { authConstants } from 'src/common/constants/auth.constant';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Creates a new user in the database.
   * @param createUserDto The data necessary to create a new user.
   * @returns A Promise that resolves to the created user.
   * @throws ConflictException if a user with the same email already exists.
   * @throws InternalServerErrorException if an unexpected error occurs during user creation.
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) {
        throw new ConflictException(authConstants.USER_EXISTS);
      }
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Finds a user by their email address.
   * @param email The email address of the user to find.
   * @returns A Promise that resolves to the found user, or null if not found.
   * @throws InternalServerErrorException if an unexpected error occurs during the search.
   */
  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
