import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
// import { DatabaseModule } from './database/database.module';
// import { User } from './user/user.entity';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { User1Service } from './user/user1.service';
import { MediatorService } from '../src/user/mediator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
// import { MediatorModule } from './mediator/mediator.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    //DatabaseModule.forRoot([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      entities: [User],
      synchronize: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
    // MediatorModule,
  ],
  providers: [User1Service, MediatorService],
})
export class AppModule implements NestModule {
  constructor(private datasoure: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
