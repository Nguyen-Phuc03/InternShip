import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Đảm bảo cho phép tất cả nguồn truy cập, tránh lỗi CORS
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  // Xử lý khi khởi tạo server
  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    //this.server.emit('message', `Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    //this.server.emit('message', `Client disconnected: ${client.id}`);
  }

  // Lắng nghe sự kiện 'message' từ client
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log(`Received message from ${client.id}: ${payload}`);
    // this.server.emit('message', `Server received: ${payload}`);
  }
}
