import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { authConstants } from 'src/common/constants/auth.constant';

@Injectable()
export class AuthService {
  private readonly tokenBlacklist: Set<string> = new Set();
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user.
   * @param signUpDto The data necessary for user registration.
   * @returns A Promise containing a message confirming the user creation and user information.
   */
  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      const createdUser = await this.userService.createUser({
        ...signUpDto,
        password: hashedPassword,
      });
      return {
        message: authConstants.USER_CREATED,
        user: {
          email: createdUser.email,
          firstname: createdUser.firstname,
          lastname: createdUser.lastname,
          role: createdUser.role,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Logs in an existing user.
   * @param loginDto The login credentials of the user.
   * @returns A Promise containing an access token upon successful login.
   */
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(loginDto.email);
      if (!user) {
        throw new NotFoundException(authConstants.NOT_FOUND);
      }
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException(authConstants.PASSWORD_INVALID);
      }
      const payload = { email: user.email, sub: user._id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Logs out a user by blacklisting the provided token.
   * @param token The JWT token to be blacklisted.
   * @returns A Promise that resolves once the token is blacklisted.
   */
  async logout(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
  }

  /**
   * Checks if a token is blacklisted.
   * @param token The JWT token to be checked.
   * @returns A Promise resolving to true if the token is blacklisted, false otherwise.
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.tokenBlacklist.has(token);
  }

  /**
   * Validates a user using the JWT payload.
   * @param payload The JWT payload containing user information.
   * @returns A Promise containing user information if the user is valid, null otherwise.
   */
  async validateUser(payload: JwtPayload): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(payload.email);
      return user ? { email: user.email, id: user._id, role: user.role } : null;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
