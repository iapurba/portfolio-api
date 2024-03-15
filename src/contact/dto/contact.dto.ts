import { IsNotEmpty } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  senderEmail: string;

  @IsNotEmpty()
  senderName: string;

  @IsNotEmpty()
  toProfileId: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;
}
