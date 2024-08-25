import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
//UserService là provider
@Injectable()
export class UserService {
  private users = [];

  constructor(private readonly i18n: I18nService) {}

  create(user) {
    this.users.push(user);

    return this.i18n.t('lang.USER_CREATED', {
      lang: I18nContext.current().lang,
    });
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('lang.USER_NOT_FOUND', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return user;
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
