import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { Role } from '../auth/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
  name: createUserDto.name,
  email: createUserDto.email,
  password: hashedPassword,
  role: createUserDto.role
});
    const saved = await this.userRepository.save(newUser);
    const { password: _, ...result } = saved;
    return result;
    
  }
  async findByEmail(email: string) {
  return this.userRepository.findOne({ where: { email } });
}
async findAll() {
  return this.userRepository.find({
    select: ['id', 'name', 'email', 'role', 'createdAt', ],
  });
}
}