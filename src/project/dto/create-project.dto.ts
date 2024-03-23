import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for Image URL' },
  )
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  tools: [string];

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for source code URL' },
  )
  @ApiProperty({ required: false })
  sourceCodeUrl: string;

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for live URL' },
  )
  @ApiProperty({ required: false })
  liveUrl: string;
}
