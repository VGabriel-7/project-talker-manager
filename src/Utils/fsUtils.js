const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
    const talkers = JSON.parse(data);

    return talkers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

async function findTalkerById(talkerId) {
  try {
    const talkers = await readTalkers();
    const finderedTalker = talkers.find(({ id }) => id === talkerId);

    return finderedTalker;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

async function addNewTalker(newTalker) {
  try {
    const talkers = await readTalkers();
    const newTalkerWithId = { id: talkers.length + 1, ...newTalker };
    const newTalkers = JSON.stringify([...talkers, newTalkerWithId]);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), newTalkers);
    return newTalkerWithId;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

// const testTheFuncs = async () => {
//   console.log(await addNewTalker({
//     name: 'Danielle Santos',
//     age: 56,
//     talk: {
//       watchedAt: '22/10/2019',
//       rate: 5,
//     },
//   }));
// };

// testTheFuncs();

module.exports = {
  readTalkers,
  findTalkerById,
  addNewTalker,
};
