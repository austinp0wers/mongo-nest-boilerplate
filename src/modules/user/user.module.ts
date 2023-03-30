import { UserServiceImpl } from './service/implements/user.service.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './schema/user.schema';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [{ provide: 'UserService', useClass: UserServiceImpl }],
  controllers: [],
  exports: [{ provide: 'UserService', useClass: UserServiceImpl }],
})
export class UserModule {}
