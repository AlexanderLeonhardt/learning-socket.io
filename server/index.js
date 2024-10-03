import express from 'express';
import { createServer  } from 'http';

const PORT = 3001;

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});