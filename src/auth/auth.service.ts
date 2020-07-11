import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authUserDto: AuthUserDto): Promise<void> {
    return this.userRepository.signUp(authUserDto);
  }
}
