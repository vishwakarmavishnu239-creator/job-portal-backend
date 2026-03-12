import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {

  @IsNotEmpty()
  jobId: number;

  @IsNotEmpty()
  resume: string;

}