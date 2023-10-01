require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const users = require('./routes/users');
const cards = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const errorHandler = require('./middlewares/error-handler');

const NotFoundError = require('./errors/not-found-err');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/signin', validateLogin, login);
app.post('/api/signup', validateRegister, createUser);

app.use(auth);
app.use('/api/users', users);
app.use('/api/cards', cards);

app.use((req, res, next) => {
  next(new NotFoundError('Неправильный запрос API'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mesto backend app listening on port ${port}`);
});
