import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  toolsUsed: [string];

  sourceCodeUrl?: string;

  liveUrl?: string;
}
