const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);

    const message = errorMessages.join('. ')

    return res.status(400).json({
      status: 'error',
      message: message
    });
  };

  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must have at least 3 characters'),
  body('email')
    .isEmail()
    .withMessage('Email should be a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 8})
    .withMessage('Password must have at least 8 characters'),
  checkValidations
];

module.exports = {createUserValidators};