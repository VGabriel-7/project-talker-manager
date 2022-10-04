const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers } = require('./Utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// daqui para baixo é o meu cód

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();

  res.status(HTTP_OK_STATUS).json(talkers);
});
