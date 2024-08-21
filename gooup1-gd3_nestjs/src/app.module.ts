import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { DatabaseModule } from './database/database.module';
import { User } from './user/user.entity';
@Module({
  imports: [UserModule, DatabaseModule.forRoot([User])],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
