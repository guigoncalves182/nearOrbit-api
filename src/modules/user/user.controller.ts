import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<IUser> {
    return this.userService.create(createUserDTO);
  }
}
