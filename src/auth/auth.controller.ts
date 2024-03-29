import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { swaggerDocsConstants } from 'src/common/constants/swagger.constant';
import { AdminGuard } from './guards/admin.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user.
   * @param signUpDto The data necessary for user registration.
   * @returns A Promise containing the newly created user information.
   */
  @Post('/signup')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SignUpDto })
  @ApiOperation({
    summary: swaggerDocsConstants.AUTH.SIGN_UP.SUMMARY,
    description: swaggerDocsConstants.AUTH.SIGN_UP.DESC,
  })
  @ApiBody({ type: SignUpDto })
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }

  /**
   * Logs in an existing user.
   * @param loginDto The login credentials of the user.
   * @returns A Promise containing authentication information for the logged-in user.
   */
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiOperation({
    summary: swaggerDocsConstants.AUTH.LOGIN.SUMMARY,
    description: swaggerDocsConstants.AUTH.LOGIN.DESC,
  })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }
}
