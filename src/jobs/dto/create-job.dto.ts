import { IsNotEmpty,IsOptional } from 'class-validator';

export class CreateJobDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  location: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  salary?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  experience?: string;
}