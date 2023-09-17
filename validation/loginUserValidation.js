const { celebrate, Joi } = require('celebrate');

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    password: Joi.string().required(),
  }),
});

module.exports = loginUserValidation;
