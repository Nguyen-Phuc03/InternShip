import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usermodule } from './Modules/user/user.module';

@Module({
  imports: [Usermodule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
