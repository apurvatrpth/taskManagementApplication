import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUpUser(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<void> {
    return this.authService.signUp(authUserDto);
  }

  @Post('/signin')
  loginUser(
    @Body() authUserDto: AuthUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authUserDto);
  }
}
