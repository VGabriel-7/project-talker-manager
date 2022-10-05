const { validEmail, validPassword, validTalker, validToken } = require('../Validation');

const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validLoginMD = (req, res, next) => {
  const { email, password } = req.body;

  if (validEmail(email)) {
    res.status(HTTP_BAD_REQUEST).json(validEmail(email));
  } else if (validPassword(password)) {
    res.status(HTTP_BAD_REQUEST).json(validPassword(password));
  } else {
    next();
  }
};

const validDataTalkerMD = (req, res, next) => {
  const { authorization } = req.headers;
  const dataNewTalker = req.body;

  if (validToken(authorization)) {
    res.status(HTTP_UNAUTHORIZED).json(validToken(authorization));
  } else if (validTalker(dataNewTalker)) {
    res.status(HTTP_BAD_REQUEST).json(validTalker(dataNewTalker));
  } else {
    next();
  }
};

module.exports = {
  validLoginMD,
  validDataTalkerMD,
};
