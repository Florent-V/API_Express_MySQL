// Validation Module JOI - USER

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname : Joi.string().max(255).required(),
  city: Joi.string().max(255),
  language: Joi.string().max(255)
})

const validateUserJOI = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

// Validation Module JOI - MOVIE

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().min(1895).max(2100).required(),
  description: Joi.string().max(2000).required(),
  duration: Joi.number().min(0).max(1000).required()
})

const validateMovieJOI = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const {error} = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

module.exports = {
  validateMovieJOI,
  validateUserJOI,
};