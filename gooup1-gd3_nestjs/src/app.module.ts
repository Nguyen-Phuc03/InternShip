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
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { User_mongodb } from './user/entities/UserMongodb.entity';
import { CacheModule } from '@nestjs/cache-manager';
// import { MediatorModule } from './mediator/mediator.module';
import { UploadModule } from './Upload/upload.module';
import { FileEntity } from './Upload/entities/upload.entity';
@Module({
  imports: [
    CacheModule.register({
      //max: 100,
      ttl: 30 * 1000,
      isGlobal: true,
    }),
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

      entities: [User, FileEntity],
      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      database: process.env.DB_DATABASE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User_mongodb],
      synchronize: false,
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
    UploadModule,
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
