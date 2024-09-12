import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User1Service } from './user1.service';

@Injectable()
export class MediatorService {
  private userService: UserService;
  private user1Service: User1Service;

  public registerUserService(userService: UserService) {
    this.userService = userService;
  }

  public registerUser1Service(user1Service: User1Service) {
    this.user1Service = user1Service;
  }

  public notify(serviceName: string, event: string): void {
    if (serviceName === 'UserService') {
      if (event === 'userCreated') {
        this.user1Service.handleUserCreation();
      }
    }
  }
}
