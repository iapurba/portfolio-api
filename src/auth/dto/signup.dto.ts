import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/users/enums/role.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastname: string;

  @IsEnum(UserRole)
  @ApiProperty({ required: false })
  readonly role: UserRole;
}
