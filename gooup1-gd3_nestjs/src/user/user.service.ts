import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { UserDto } from './dto/user.dto';
import { I18nContext } from 'nestjs-i18n';
@Injectable()
export class UserService {
  constructor(private readonly i18n: I18nService) {}
  private readonly users: UserDto[] = [
    {
      id_users: 1,
      name: 'Phuc',
      phone: 123487755544,
      address: 'quanlienchieu',
      email: 'nphuc305072@gmail.com',
    },
    {
      id_users: 2,
      name: 'Long',
      phone: 231213213124,
      address: 'quanlienchieu',
      email: 'long@example.com',
    },
  ];

  create(user: UserDto) {
    this.users.push(user);
    return this.i18n.t('lang.USER_CREATED', {
      lang: I18nContext.current().lang,
    });
  }

  findAll() {
    //console.log(this.appkey);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id_users === id);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('lang.USER_NOT_FOUND', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return user;
  }
  findByName(name: string) {
    const users = this.users.filter(
      (user) => user.name.toLowerCase() === name.toLowerCase(),
    );
    if (users.length === 0) {
      throw new NotFoundException(this.i18n.t('lang.USER_NOT_FOUND'));
    }
    return users;
  }

  update(id: number, updateUser: UserDto) {
    const userIndex = this.users.findIndex((user) => user.id_users === id);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUser };
      return this.users[userIndex];
    }
    throw new NotFoundException(
      this.i18n.t('lang.USER_NOT_FOUND', {
        lang: I18nContext.current().lang,
      }),
    );
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id_users === id);
    if (userIndex > -1) {
      const [user] = this.users.splice(userIndex, 1);
      return user;
    }
    throw new NotFoundException(
      this.i18n.t('lang.USER_NOT_FOUND', {
        lang: I18nContext.current().lang,
      }),
    );
  }
}
