import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketsService } from './socket.service';

@Module({
  providers: [SocketGateway, SocketsService],
  exports: [SocketGateway],
})
export class SocketModule {}
