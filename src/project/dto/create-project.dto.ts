import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

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
