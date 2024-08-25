import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { DatabaseModule } from './database/database.module';
import { User } from './user/user.entity';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot([User]),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, './i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [UserService],
})
export class AppModule implements NestModule {
  constructor() {
    console.log(__dirname); // In ra đường dẫn hiện tại
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
