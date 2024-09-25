import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  Body,
  Post,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CUser } from './user.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
  //constructor(private readonly userService: UserService) {}
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}
  @Post()
  create(@Body() userDto: UserDto, @CUser() user: UserDto) {
    console.log('User data:', user);
    return this.userService.create(userDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get('find/list')
  getUsersByName(@Query('name') name: string) {
    const users = this.userService.findByName(name);
    return users;
  }
}
