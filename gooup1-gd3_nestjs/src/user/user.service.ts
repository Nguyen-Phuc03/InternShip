import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { UserDto } from './dto/user.dto';
import { I18nContext } from 'nestjs-i18n';
import { User1Service } from './user1.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MediatorService } from './mediator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly i18n: I18nService,

    // @Inject(forwardRef(() => User1Service))
    // private readonly user1service: User1Service,
    private readonly mediatorService: MediatorService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    this.mediatorService.notify('UserService', 'userCreated');
    return await this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id_users: id });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('lang.USER_NOT_FOUND', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return user;
  }

  async findByName(name: string): Promise<User[]> {
    const users = await this.userRepository.find({ where: { name } });
    if (users.length === 0) {
      throw new NotFoundException(
        this.i18n.t('lang.USER_NOT_FOUND', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return users;
  }

  async update(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
