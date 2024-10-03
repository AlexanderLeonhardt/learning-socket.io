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
    origin: 'http://localhost:5173/'
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});