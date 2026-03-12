import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './../users/user.entity';

@Controller('applications')
export class ApplicationsController {

  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  apply(@Body() dto: CreateApplicationDto, @Request() req : any) {
    return this.applicationsService.apply(dto,req.User.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    const user = req.user;
    if(user.role === 'CANDIDATE') {
      return this.applicationsService.findByUser(user.id);
    }
    return this.applicationsService.findAll();
  }

}
