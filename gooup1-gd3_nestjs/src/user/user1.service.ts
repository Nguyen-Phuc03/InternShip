import { Injectable } from '@nestjs/common';
import { MediatorService } from './mediator.service';

@Injectable()
export class User1Service {
  constructor(
    // @Inject(forwardRef(() => UserService)) private userservice: UserService,
    private readonly mediatorService: MediatorService,
  ) {
    this.mediatorService.registerUser1Service(this);
  }

  handleUserCreation(): void {
    console.log('Handling user creation in User1Service');
  }
}
