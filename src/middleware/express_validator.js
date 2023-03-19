
// Validation Module EXPRESS-VALIDATOR - USER

const { body, validationResult } = require('express-validator');

const validateUserExpress = [
  body("email")
    .notEmpty()
    .withMessage("L'adresse mail est obligatoire")
    .isEmail()
    .withMessage("L'adresse mail n'est pas valide"),
  body("firstname")
    .notEmpty()
    .withMessage('Le prénom est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("lastname")
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("city")
    .optional()
    .isLength({ max:255 })
    .withMessage('La longueur maximale est de 255 caractères'),
  body("language")
    .optional()
    .isLength({ max:255 })
    .withMessage('La longueur maximale est de 255 caractères'),
  body("password")
    .notEmpty()
    .isLength({ max:255 })
    .withMessage('La longueur maximale est de 255 caractères'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

// Validation Module EXPRESS-VALIDATOR - MOVIE

const validateMovieExpress = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ max: 255})
    .withMessage("La longueur maximale est de 255 caractères"),
  body("director")
    .notEmpty()
    .withMessage('Le nom du réalisteur est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("year")
    .notEmpty()
    .withMessage('L\'année est obligatoire')
    .isInt({ min: 1895, max: 2100})
    .withMessage('L\'année n\'est pas valide'),
  body("description")
    .notEmpty()
    .withMessage('La description est obligatoire')
    .isLength({ max: 2000})
    .withMessage('La longueur maximale est de 2000 caractères'),
  body("duration")
    .notEmpty()
    .withMessage('La durée est obligatoire')
    .isInt({ min: 0, max: 1000})
    .withMessage('La durée n\'est pas valide'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

const validateBookExpress = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ max: 255})
    .withMessage("La longueur maximale est de 255 caractères"),
  body("author")
    .notEmpty()
    .withMessage('Le nom de l\'auteur est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("year")
    .notEmpty()
    .withMessage('L\'année est obligatoire')
    .isInt({ min: 1895, max: 2100})
    .withMessage('L\'année n\'est pas valide'),
  body("description")
    .notEmpty()
    .withMessage('La description est obligatoire')
    .isLength({ max: 2000})
    .withMessage('La longueur maximale est de 2000 caractères'),
  body("pages")
    .notEmpty()
    .withMessage('Le nombre de page est obligatoire')
    .isInt({ min: 0, max: 1000})
    .withMessage('Le nombre de page n\'est pas valide'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
  validateUserExpress,
  validateMovieExpress,
  validateBookExpress,
};