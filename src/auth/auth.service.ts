import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authUserDto: AuthUserDto): Promise<void> {
    return this.userRepository.signUp(authUserDto);
  }

  async signIn(authUserDto: AuthUserDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authUserDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
