const { check } = require("express-validator");
const validateResults = require("../middleware/validatorMiddleware.js");

const validatorRegister = [
  check("name")
    .exists()
    .withMessage("El nombre es obligatorio")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3, max: 15 })
    .withMessage("El nombre debe tener entre 3 y 99 caracteres")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("El nombre solo debe contener letras y espacios"),
  check("surname")
    .exists()
    .withMessage("El apellido es obligatorio")
    .notEmpty()
    .withMessage("El apellido no puede estar vacío")
    .isLength({ min: 3, max: 15 })
    .withMessage("El apellido debe tener entre 3 y 99 caracteres")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("El apellido solo debe contener letras y espacios"),
  check("email")
    .exists()
    .withMessage("El correo electrónico es obligatorio")
    .notEmpty()
    .withMessage("El correo electrónico no puede estar vacío")
    .isEmail()
    .withMessage(
      "Debe proporcionar una dirección de correo electrónico válida"
    ),
  check("type").optional(),

  check("password")
    .exists()
    .withMessage("La contraseña es obligatoria")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía")
    .isLength({ min: 3, max: 15 })
    .withMessage("La contraseña debe tener minimo 3 caracteres y maximo 15"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
