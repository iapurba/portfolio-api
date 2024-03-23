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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(loginDto.email);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      const payload = { email: user.email, sub: user._id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      const createdUser = await this.userService.createUser({
        email: signUpDto.email,
        firstname: signUpDto.firstname,
        lastname: signUpDto.lastname,
        password: hashedPassword,
        role: signUpDto.role,
      });
      return {
        message: 'User Created Successful',
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

  async validateUser(payload: JwtPayload): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(payload.email);
      return user ? { email: user.email, id: user._id } : null;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
