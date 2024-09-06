import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const customProvider = {
  provide: 'USER_SERVICE',
  useClass: UserService,
};
@Module({
  controllers: [UserController],
  providers: [customProvider],
  exports: [customProvider],
})
export class UserModule {}
