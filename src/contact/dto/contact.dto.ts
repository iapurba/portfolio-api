import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  senderEmail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  senderName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  toProfileId: string;
}
