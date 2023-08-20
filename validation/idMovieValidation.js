const { celebrate, Joi } = require('celebrate');

const idMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(1).hex().required(),
  }),
});

module.exports = idMovieValidation;
