const express = require('express');
const bodyParser = require('body-parser');
const randomToken = require('random-token');
const { readTalkers, findTalkerById } = require('./Utils/fsUtils');
const { validLoginMD } = require('./Utils/middlewaresUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// My code

// Returns an array with talkers #1
app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();

  res.status(HTTP_OK_STATUS).json(talkers);
});

// Return a talker #2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const findTalker = await findTalkerById(Number(id));

  if (findTalker) {
    res.status(HTTP_OK_STATUS).send(findTalker);
  } else {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// Recive email and password, return a random token #3 & #4
app.post('/login', validLoginMD, (_req, res) => {
  const token = randomToken(16);
  res.status(HTTP_OK_STATUS).json({ token });
});
