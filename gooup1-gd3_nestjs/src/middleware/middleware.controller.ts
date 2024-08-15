import { Controller, Get } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';
@Controller('middleware')
export class MiddlewareController {
  constructor(private readonly MiddlewareService: MiddlewareService) {}
  @Get()
  findAll() {
    return this.MiddlewareService.findAll;
  }
}
