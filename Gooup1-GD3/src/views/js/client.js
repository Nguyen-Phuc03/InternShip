document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const btnJoin = document.getElementById('btn_join');
  const btnSend = document.getElementById('btn_send');
  const usernameInput = document.getElementById('username');
  const roomInput = document.getElementById('room');
  const messageInput = document.getElementById('id_message');
  const messageList = document.getElementById('message-list');

  let currentRoom = '';

  btnJoin.addEventListener('click', () => {
    const username = usernameInput.value;
    const room = roomInput.value;

    if (username && room) {
      currentRoom = room;
      socket.emit('join', { username, room });
    }
  });

  btnSend.addEventListener('click', () => {
    const message = messageInput.value;

    if (message) {
      socket.emit('message', { room: currentRoom, message });
      messageInput.value = '';
    }
  });

  socket.on('thread', (data) => {
    const newMessage = document.createElement('li');
    newMessage.textContent = data.message;
    messageList.appendChild(newMessage);
  });
});
