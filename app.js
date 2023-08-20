require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const createUserValidation = require('./validation/createUserValidation');
const loginUserValidation = require('./validation/loginUserValidation');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
// app.use(cors({ origin: ['http://localhost:3001', 'http://avp.nomoreparties.co', 'https://avp.nomoreparties.co'], credentials: true }));
app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginUserValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
