import express from 'express';
import { createServer  } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const PORT = 3001;

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});