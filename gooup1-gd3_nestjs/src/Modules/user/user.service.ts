import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getTrueLove(): string {
    return 'I LOVE YOU ^^!';
  }
  private users = [];
  create(user: any) {
    this.users.push(user);
    return user;
  }
  findAll() {
    return this.users;
  }
}
