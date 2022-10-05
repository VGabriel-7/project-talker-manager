const validEmail = (email) => {
  const validRegexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Referência de regex utilizada https://medium.com/shopify-hub/como-validar-cpf-e-cnpj-usando-express%C3%B5es-regulares-regex-com-javascript-60779229455d

  if (!email) {
    return { message: 'O campo "email" é obrigatório' };
  } if (!email.match(validRegexEmail)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
};

const validPassword = (password) => {
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  } if (password.length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
};

const validToken = (token) => {
  if (!token) {
    return { message: 'Token não encontrado' };
  } if (token.length !== 16) {
    return { message: 'Token inválido' };
  }
};

const validNameAndAge = (registration) => {
  if (registration.name === undefined) {
    return { message: 'O campo "name" é obrigatório' };
  } if (registration.name.length < 3) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  } if (registration.age < 18) {
    return { message: 'A pessoa palestrante deve ser maior de idade' };
  } if (registration.age === undefined) {
    return { message: 'O campo "age" é obrigatório' };
  }
};

const validWatchedAt = (watchedAt) => {
  if (!watchedAt) {
    return { message: 'O campo "watchedAt" é obrigatório' };
  } if (
      watchedAt.length !== 10
      || watchedAt[2] !== '/'
      || watchedAt[5] !== '/'
    ) {
      return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
    }
};

const validRate = (rate) => {
  if (rate === undefined) return { message: 'O campo "rate" é obrigatório' };
  if (
    !Number.isInteger(rate)
    || rate < 1 || rate > 5
  ) return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
};

const validTalk = (talk) => {
  if (!talk) {
    return { message: 'O campo "talk" é obrigatório' };
  } if (validWatchedAt(talk.watchedAt)) {
    return validWatchedAt(talk.watchedAt);
  } if (validRate(talk.rate)) {
    return validRate(talk.rate);
  }
};

const validTalker = (registration) => {
  if (validNameAndAge(registration)) {
    return validNameAndAge(registration);
  } return validTalk(registration.talk);
};

console.log(validTalker({
  name: 'Dan',
  age: 56,
  talk: {
    watchedAt: '22/10/2019',
    rate: 3,
  },
}));

module.exports = {
  validEmail,
  validPassword,
  validTalker,
  validToken,
};