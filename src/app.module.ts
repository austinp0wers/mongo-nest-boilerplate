import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { UserInfoMiddleware } from './middlewares/user-info.middleware';

@Module({
  imports: [
    ProductModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.MONGO_URI,
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          // useCreateIndex: true,
          // useFindAndModify: false,
        };
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserInfoMiddleware).forRoutes('product');
  }
}
