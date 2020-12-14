import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from './dto/signIn.credentials.dto';
import { SignUpCredentialsDto } from './dto/signUp.credentials.dto';
import { JwtPayload } from './jwt.payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger();

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService

  ) { }

  signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(signInCredentialsDto);
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = user; // the payload object is going on the front-end, so no sensitive information (passwords)

    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT token with payload: ${JSON.stringify(payload)}`);

    return { accessToken };
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ username });
    return user ? true : false;
  }

  async getUserById(id: number) : Promise<User> {
    const user = await this.userRepository.findOne(id);
    
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
