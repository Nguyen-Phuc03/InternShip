import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { DatabaseModule } from './database/database.module';
//import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
//import { I18nService } from './i18n/i18n.service';
//import * as path from 'path';
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    DatabaseModule.forRoot({
      type: 'postgres',
      url: 'postgres://localhost/Hotel_booking_system',
    }),
  ],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
