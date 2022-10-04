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

module.exports = {
  validEmail,
  validPassword,
};