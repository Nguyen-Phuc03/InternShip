import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    DatabaseModule.forRoot({
      type: 'postgres',
      url: 'postgres://localhost:5432/Hotel_booking_system',
    }),
  ],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
