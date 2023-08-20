const router = require('express').Router();
const createMovieValidation = require('../validation/createMovieValidation');
const idMovieValidation = require('../validation/idMovieValidation');

const {
  getMovieList,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovieList);

router.post('/', createMovieValidation, postMovie);

router.delete('/:movieId', idMovieValidation, deleteMovie);

module.exports = router;
