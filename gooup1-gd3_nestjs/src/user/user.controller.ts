import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService, User } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() user: User) {
    this.userService.create(user);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() user: Partial<User>) {
    this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.remove(+id);
  }
}
