const fs = require('fs').promises;
const path = require('path');

async function readTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
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

// const testTheFuncs = async () => {
//   console.log(await findTalkerById(1568));
// };

// testTheFuncs();

module.exports = {
  readTalkers,
  findTalkerById,
};
