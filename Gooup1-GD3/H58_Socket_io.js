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
