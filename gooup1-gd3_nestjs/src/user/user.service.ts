import { Injectable } from '@nestjs/common';
export interface User {
  id: number;
  name: string;
  email: string;
}
//UserService là provider
@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
    },
  ];

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
