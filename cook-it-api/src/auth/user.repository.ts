import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { SignUpCredentialsDto } from "./dto/signUp.credentials.dto";
import { SignInCredentialsDto } from "./dto/signIn.credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpCredentialsDto: SignUpCredentialsDto) : Promise<void> {
    const { username, password, email } = signUpCredentialsDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassord(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException(`Username ${username} already exists!`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(signInCredentialsDto: SignInCredentialsDto) : Promise<{ username: string, id: number }> {
    const { username, password } = signInCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return { 
        username: user.username,
        id: user.id 
      }
    } 
  }

  private async hashPassord(password: string, salt: string) : Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}