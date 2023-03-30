import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schema/user.schema';
import { UserService } from '../user.service.interface';

export class UserServiceImpl implements UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findUserBy(type: string, field: string) {
    if (type === 'email') return await this.userModel.findOne({ email: field });
  }
  async findUsers() {
    throw new Error('Method not implemented.');
  }
  async createUser(user: any) {
    return await new this.userModel({
      email: user.email,
      name: user.name,
      provider: user.provider,
    }).save();
  }
  async updateUser(user_id: any, userDetail: any) {
    throw new Error('Method not implemented.');
  }
}
