/*
1,Client sẽ mở ra một kết nối (connection) à yêu cầu (request) dữ liệu từ Server.
2,Server sẽ nhận yêu cầu và tính toán kết quả trả về.
3,Server sẽ trả về (response) kết quả cho Client vừa mở connection đó.

so sánh từng loại : 
Socket.IO 
ưu diểm : thời gian thực , khả năng hồi phục và hổ trợ sự kiện 
nhược điểm : kích thước lớn ,cầu hình phức tạp 

Long Polling : 
ưu điểm : Tương thích tốt, đơn giản để triển khai 
nhược điểm : kích thước lớn ,cầu hình phức tạp.

Websocket 
ưu điểm : Giao tiếp hai chiều , hiệu xuất cao 
Nhược điểm: cần Server hổ trợ ,phức tạp hơn 

Server-Sent Events: 
ưu điểm :  dể sử dụng ,tự động kết nối lại 
Nhược điểm : chỉ một chiều, hổ trợ hạn chế 
*/
const path = require('path');
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'src', 'views')));

io.on('connection', (client) => {
  console.log('Có kết nối mới:');

  client.on('join', (data) => {
    const room = data.room;
    console.log(data);
    client.join(room);
  });

  client.on('message', (data) => {
    const room = data.room;
    console.log(data);
    io.to(room).emit('thread', data);
  });

  client.on('disconnect', () => {
    console.log('Client đã ngắt kết nối');
  });
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'chat.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
