import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDTO } from './dto/auth-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  singIn(@Body() authUserDto: AuthUserDTO): any {
    return this.authService.signIn(authUserDto);
  }
}
