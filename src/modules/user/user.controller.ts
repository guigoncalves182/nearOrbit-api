import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO): void {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.userService.remove(id);
  }
}
