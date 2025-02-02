const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  } else if (firstname.length >= 255) {
    errors.push({ field: "firstname", message: "Should contain less than 255 characters" });
  }

  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  } else if (lastname.length >= 255) {
    errors.push({ field: "firstname", message: "Should contain less than 255 characters" });
  }

  if (city && city.length >= 255) {
    errors.push({ field: "city", message: "Should contain less than 255 characters" });
  }

  if (language && language.length >= 255) {
    errors.push({ field: "language", message: "Should contain less than 255 characters" });
  }

  if (!emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }

}




const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "This field is required" });
  } else if (title.length >= 255) {
    errors.push({ field: "title", message: "Should contain less than 255 characters" });
  }

  if (director == null) {
    errors.push({ field: "director", message: "This field is required" });
  } else if (director.length >= 255) {
    errors.push({ field: "director", message: "Should contain less than 255 characters" });
  }

  if (year == null) {
    errors.push({ field: "year", message: "This field is required" });
  } else if (year.length >= 255) {
    errors.push({ field: "year", message: "Should contain less than 255 characters" });
  }

  if (color == null) {
    errors.push({ field: "color", message: "This field is required" });
  } else if (color.length >= 255) {
    errors.push({ color: "title", message: "Should contain less than 255 characters" });
  }

  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" });
  } else if (duration != parseInt(duration)) {
    errors.push({ duration: "duration", message: "Should be an integer" });
  } else if (duration <= 0) {
    errors.push({ duration: "duration", message: "Shouldn't be negative" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};