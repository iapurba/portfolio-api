import { ArrayMinSize, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  tools: [string];

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for source code URL' },
  )
  sourceCodeUrl: string;

  @IsUrl(
    { require_tld: false },
    { message: 'Invalid URL provided for live URL' },
  )
  liveUrl: string;
}
