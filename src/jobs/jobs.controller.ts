import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
// import { RolesGuard } from './../auth/guards/roles.guard';

@Controller('jobs')
export class JobsController {

  constructor(private readonly jobsService: JobsService) {}

  // Only recruiters can create jobs
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'RECRUITER')
  @Post()
  create(@Body() CreateJobDto : CreateJobDto) {
    return this.jobsService.create(CreateJobDto);
  }

  // Anyone logged in can view jobs
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

}