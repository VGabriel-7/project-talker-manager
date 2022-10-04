const { validEmail, validPassword } = require('../Validation');

const HTTP_BAD_REQUEST = 400;

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

module.exports = {
  validLoginMD,
};
