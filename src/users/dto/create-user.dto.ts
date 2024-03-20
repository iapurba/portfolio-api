import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}
