import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class JobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  jobType: string;

  @ApiProperty()
  description: string;
}

export class WorkExperienceDto {
  @ApiProperty()
  organization: string;

  @ApiProperty()
  jobs: JobDto[];
}

export class TechnicalSkillDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  rating: number;
}

export class EducationDto {
  @ApiProperty()
  institution: string;

  @ApiProperty()
  degree: string;

  @ApiProperty()
  stream: string;

  @ApiProperty()
  startYear: string;

  @ApiProperty()
  endYear: string;
}

export class CertificationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  issuer: string;

  @ApiProperty()
  issuedOn: string;
}

export class CreateResumeDto {
  @IsNotEmpty()
  @ApiProperty({ readOnly: true })
  profileId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [WorkExperienceDto] })
  @ValidateNested({ each: true })
  workExperiences: WorkExperienceDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => TechnicalSkillDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [TechnicalSkillDto] })
  technicalSkills: TechnicalSkillDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => EducationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [EducationDto] })
  educations: EducationDto[];

  @Type(() => CertificationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CertificationDto] })
  certifications: CertificationDto[];
}
