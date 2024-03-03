import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly intro: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly jobs: [string];

  @IsNotEmpty()
  readonly bio: string;

  @IsNotEmpty()
  readonly contactDetails: {
    readonly address: string;
    readonly email: string;
    readonly phone: string;
  };
}
