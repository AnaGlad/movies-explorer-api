require('dotenv/config');
const jwt = require('jsonwebtoken');
const WrongTokenError = require('../errors/wrong-token-err');

const { JWT_SECRET = 'sometoken' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new WrongTokenError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new WrongTokenError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
