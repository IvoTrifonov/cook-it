import { Body, Controller, Get, Header, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signIn.credentials.dto';
import { SignUpCredentialsDto } from './dto/signUp.credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Get('/signup')
  checkUsernameExists(
    @Query('username') username: string
  ): Promise<boolean> {
    return this.authService.checkUsernameExists(username);
  }

  @Post('/signin')
  @Header('accesstoken', 'gohos')
  signIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
