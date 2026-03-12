import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationsService {

  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  findAll() {
    return this.applicationRepository.find({
      relations: ['job', 'user'],
    });
  }

  async apply(dto: CreateApplicationDto, userId: string) {

    const application = this.applicationRepository.create({
      resume: dto.resume,
      job: { id: dto.jobId } as any,
      user: { id: userId } as any,
    });

    return await this.applicationRepository.save(application);
  }
  async findByUser(userId: string) {
    return this.applicationRepository.find({
      where: { user: { id: userId } as any },
      relations: ['job', 'user'],
    });
  }
}