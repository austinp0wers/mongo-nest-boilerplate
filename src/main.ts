import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';
import * as cors from 'cors';
import { SentryExceptionFilter } from './filters/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  Sentry.init({
    dsn: process.env.Sentry_DSN, // Replace with your Sentry DSN
    tracesSampleRate: 1.0,
  });
  app.disable('x-powered-by');
  app.use(
    cors({
      origin: '*',
    }),
  );
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   credentials: true,
  // });
  app.useGlobalFilters(new SentryExceptionFilter());
  await app.listen(4000);
}
bootstrap();
