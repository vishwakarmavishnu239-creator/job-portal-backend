import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
  if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

  const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

  if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
  sub: user.id,
  email: user.email,
  role: user.role
};
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      name: user.name,
      id: user.id,
    };
  }
}
