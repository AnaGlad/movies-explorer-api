const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const userRouter = require('./users');
const movieRouter = require('./movie');

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
