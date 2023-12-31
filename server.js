import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

async function createServer() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const app = express();
  const PORT = 3000;

  app.use(express.static(resolve(__dirname, './dist')));
  app.use((req, res) => {
    res.send(`${__dirname}/dist/index.html`);
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Express static listening on port ${PORT}!`);
  });
}

createServer();
