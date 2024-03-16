import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

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

  readonly socialAccounts: {
    readonly linkedIn?: string;
    readonly github?: string;
    readonly instagram?: string;
    readonly facebook?: string;
    readonly x?: string;
  };
}
