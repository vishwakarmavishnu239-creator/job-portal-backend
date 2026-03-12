import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {

  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job = this.jobsRepository.create(createJobDto);
    return this.jobsRepository.save(job);
  }

  async findAll() {
    return this.jobsRepository.find();
  }
}
