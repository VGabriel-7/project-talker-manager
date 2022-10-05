const express = require('express');
const bodyParser = require('body-parser');
const randomToken = require('random-token');
const { readTalkers, findTalkerById,
  addNewTalker, updateTalker, deleteTalker, searchTalker } = require('./Utils/fsUtils');
const { validLoginMD, validDataTalkerMD, validatedToken } = require('./Utils/middlewaresUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
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

// find an talkers using the param
app.get('/talker/search', validatedToken, async (req, res) => {
  const { q } = req.query;

  const searchArray = await searchTalker(q);
  res.status(HTTP_OK_STATUS).send(searchArray);
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

// Add a new Talker
app.post('/talker', validDataTalkerMD, async (req, res) => {
  const newTalker = req.body;

  const newTalkerWithId = await addNewTalker(newTalker);
  res.status(HTTP_CREATED).json(newTalkerWithId);
});

// update a talker
app.put('/talker/:id', validDataTalkerMD, async (req, res) => {
  const { id } = req.params;
  const dataTalker = req.body;

  const updatedTalker = await updateTalker(Number(id), dataTalker);

  res.status(HTTP_OK_STATUS).json(updatedTalker);
});

// delete a talkker
app.delete('/talker/:id', validatedToken, async (req, res) => {
  const { id } = req.params;

  await deleteTalker(Number(id));

  res.status(HTTP_NO_CONTENT).end();
});
