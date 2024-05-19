import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const salt = Number(process.env.SALT);

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const { password } = createUserDto;
    const hash = await bcrypt.hash(password, salt);
    return await this.userModel.create({
      ...createUserDto,
      password: hash,
    });
  }

  /**
   * Bound one account to one user:
   * *  id - Target userId
   * *  account - Target account
   */
  async addAccount(id: string, account: string): Promise<boolean> {
    const { acknowledged } = await this.userModel
      .updateOne({ _id: id }, { $push: { account } })
      .exec();

    return acknowledged;
  }
}
