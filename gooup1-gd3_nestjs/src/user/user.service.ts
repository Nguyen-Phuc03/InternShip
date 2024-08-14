import { Injectable } from '@nestjs/common';
export interface User {
  id: number;
  name: string;
  email: string;
}
@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  create(user: User) {
    this.users.push(user);
  }

  update(id: number, updateUser: Partial<User>) {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, updateUser);
    }
  }

  remove(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
