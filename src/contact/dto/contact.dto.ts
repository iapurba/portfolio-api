import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @ApiProperty()
  senderEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  senderName: string;

  @IsNotEmpty()
  @ApiProperty()
  toProfileId: string;

  @IsNotEmpty()
  @ApiProperty()
  subject: string;

  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
