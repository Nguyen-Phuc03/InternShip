import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User1Service } from './user1.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MediatorService } from './mediator.service';

const customProvider = {
  provide: 'USER_SERVICE',
  useClass: UserService,
};
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [customProvider, User1Service, UserService, MediatorService],
  exports: [customProvider, UserService],
})
export class UserModule {}
