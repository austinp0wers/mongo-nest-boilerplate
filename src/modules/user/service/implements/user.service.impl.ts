import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schema/user.schema';
import { UserService } from '../user.service.interface';

export class UserServiceImpl implements UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findUserBy(type: string, field: string) {
    let user;
    if (type === 'email')
      user = await this.userModel.findOne({
        email: field,
        visible: true,
        deletedAt: null,
      });
    return user;
  }
  async findUsers() {
    throw new Error('Method not implemented.');
  }
  async createUser(user: any) {
    try {
      return await new this.userModel({
        email: user.email,
        name: user.name,
        phone: user.phone ? user.phone : String(Date.now()),
        password: user.password ? user.password : '',
        provider: user.provider ? user.provider : 'onsite',
      }).save();
    } catch (err) {
      console.log('err', err);
    }
  }
  async updateUser(user_id: any, userDetail: any) {
    throw new Error('Method not implemented.');
  }
}
