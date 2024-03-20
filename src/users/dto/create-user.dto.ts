import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserRole } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;

  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}
