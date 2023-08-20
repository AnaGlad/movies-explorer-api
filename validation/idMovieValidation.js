const { celebrate, Joi } = require('celebrate');

const idMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = idMovieValidation;
