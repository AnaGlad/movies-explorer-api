const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequestError = require('../errors/bad-request-err'); // 400
// const ForbiddenActionError = require('../errors/forbidden-action'); // 403

const OK_CODE = 200;
const CREATED_CODE = 201;

function getMovieList(req, res, next) {
  return Movie.find({ owner: req.user._id })
    .then((movie) => res.status(OK_CODE).send(movie))
    .catch(next);
}

function postMovie(req, res, next) {
  return Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  // console.log(req.params);
  Movie.findOneAndDelete({ movieId, owner: req.user._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      return res.status(OK_CODE).send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат Id'));
      } else { next(err); }
    });
}

module.exports = {
  getMovieList,
  postMovie,
  deleteMovie,
};
