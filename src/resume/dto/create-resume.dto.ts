import { IsNotEmpty } from 'class-validator';

export class JobDto {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  jobType: string;
  description: string;
}

export class WorkExperienceDto {
  id: number;
  company: string;
  jobs: JobDto[];
}

export class TechnicalSkillDto {
  name: string;
  rating: number;
}

export class EducationDto {
  institution: string;
  degree: string;
  stream: string;
  startYear: string;
  endYear: string;
}

export class CertificationDto {
  name: string;
  issuer: string;
  issuedOn: string;
}

export class CreateResumeDto {
  @IsNotEmpty()
  profileId: string;

  @IsNotEmpty()
  workExperiences: WorkExperienceDto[];

  @IsNotEmpty()
  technicalSkills: TechnicalSkillDto[];

  @IsNotEmpty()
  educations: EducationDto[];

  certifications: CertificationDto[];
}
