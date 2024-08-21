import { Injectable } from '@nestjs/common';
//UserService là provider

@Injectable()
export class UserService {
  private users = [];

  create(user) {
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUser) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = updateUser;
      return updateUser;
    }
    return null;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      const user = this.users.splice(userIndex, 1);
      return user;
    }
    return null;
  }
}
