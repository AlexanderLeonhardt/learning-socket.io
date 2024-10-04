import express from 'express';
import { createServer  } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = 3001;

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const messages = [];

io.on('connection', (socket) => {
  console.log(`User connected`);

  socket.emit('messageHistory', messages);

  socket.on('sendMessage', (data) => {
    messages.push(data);
    socket.broadcast.emit('recieveMessage', messages);
  });

  socket.on('disconnect', (reason) => {
    console.log(`User disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});