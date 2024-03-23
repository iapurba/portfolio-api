import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly intro: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  readonly jobs: [string];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly bio: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    properties: {
      address: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
    },
  })
  readonly contactDetails: {
    readonly address: string;
    readonly email: string;
    readonly phone: string;
  };

  @IsOptional()
  @ApiProperty({
    type: 'object',
    properties: {
      linkedIn: { type: 'string' },
      github: { type: 'string' },
      instagram: { type: 'string' },
      facebook: { type: 'string' },
      x: { type: 'string' },
    },
    required: false,
  })
  readonly socialAccounts: {
    readonly linkedIn?: string;
    readonly github?: string;
    readonly instagram?: string;
    readonly facebook?: string;
    readonly x?: string;
  };

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for Profile Image URL' },
  )
  @IsNotEmpty()
  @ApiProperty()
  readonly profileImageUrl: string;

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for Bio Image URL' },
  )
  @IsNotEmpty()
  @ApiProperty()
  readonly bioImageUrl: string;

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for Bio Image URL' },
  )
  @IsNotEmpty()
  @ApiProperty()
  readonly downloadCvUrl: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    properties: {
      email: { type: 'string' },
      passcode: { type: 'string' },
    },
  })
  readonly autoEmailCredentials: {
    email: string;
    passcode: string;
  };
}
