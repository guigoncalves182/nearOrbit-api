import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthUserDTO } from './dto/auth-user.dto';
import { compare } from 'bcrypt';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

interface ISignIn {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: AuthUserDTO): Promise<ISignIn> {
    const foundUser: User = await this.userService.findByEmail(email);

    if (!foundUser)
      throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);

    if (!(await compare(password, foundUser.password)))
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

    if (!foundUser.isActive)
      throw new HttpException('User not actvive', HttpStatus.UNAUTHORIZED);

    const payload = {
      email: foundUser.email,
      fullName: foundUser.fullName,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
