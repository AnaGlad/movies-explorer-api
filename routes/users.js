const router = require('express').Router();
// const { celebrate, Joi, errors, Segments } = require('celebrate');
const updateUserValidation = require('../validation/updateUserValidation');
// const idUserValidation = require('../validation/idUserValidation');

const {
  updateUserProfile,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', updateUserValidation, updateUserProfile);

module.exports = router;
