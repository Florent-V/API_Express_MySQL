/*const AbstractManager = require('./abstractManager');
const connection = require('./database');

class MovieManager extends AbstractManager {
  constructor() {
    super({ table: "movies" });
  }


}

module.exports = new MovieManager();*/

const db = require('./database');

const Movie = function(movie) {
  this.title = movie.title;
  this.director = movie.director;
  this.year = movie.year;
  this.description = movie.description;
  this.duration = movie.duration;
}

// C from CRUD : Create One New
Movie.create = (movie) => {
  const {title, director, year, description, duration } = movie;
  return db.execute('INSERT INTO movie (title, director, year, description, duration) VALUES (?, ?, ?, ?, ?)',
  [
    title,
    director,
    year,
    description,
    duration
  ]);
};

// R from CRUD : Get All With Filters

Movie.getAll = (req) => {
  let baseSql = "SELECT * FROM movie";
  const sqlValues = [];

  if (req.query.year) {
    sqlValues.push({
      criteria: "year =",
      value: req.query.year
    });
  }

  if (req.query.max_duration) {
    sqlValues.push({
      criteria: "duration <=",
      value: req.query.max_duration
    });
  }

  let query = sqlValues.reduce(
    (sql, { criteria }, index) =>
      `${sql} ${index === 0 ? "where" : "and"} ${criteria} ? `,
      baseSql
  );

  console.log(query);
  console.log(sqlValues);

  return db.execute(
    sqlValues.reduce(
      (sql, { criteria }, index) =>
        `${sql} ${index === 0 ? "where" : "and"} ${criteria} ? `,
        baseSql
    ),
    sqlValues.map(({ value }) => value)
  );
};


//R from CRUD : Get One By ID
Movie.getById = (id) => {
  return db.execute('SELECT * FROM movie WHERE id = ?', [id]);
};


//U from CRUD : Update One By ID
Movie.updateById = (id, movie) => {
  const {title, director, year, description, duration } = movie;
  return db.execute('UPDATE movie SET title = ?, director = ?, year = ?, description = ?, duration = ? WHERE id = ?',
  [ 
    title,
    director,
    year,
    description,
    duration,
    id
  ]);
};


//D from CRUD : Delete One By ID
Movie.deleteById = (id) => {
  return db.execute('DELETE FROM movie WHERE id = ?', [id]);
};

module.exports = Movie;