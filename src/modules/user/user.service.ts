import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';

const salt = Number(process.env.SALT);

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email });
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDTO): Promise<IUser> {
    const { password } = createUserDto;
    const hash = await bcrypt.hash(password, salt);
    return await this.userModel.create({
      ...createUserDto,
      password: hash,
    });
  }

  async addAccount(id: string, account: string): Promise<boolean> {
    const { acknowledged } = await this.userModel
      .updateOne({ _id: id }, { $push: { account } })
      .exec();

    return acknowledged;
  }
}
