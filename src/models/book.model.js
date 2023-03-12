const db = require("./database");

// constructor
class BookModel  {
  constructor() {
    this.table = "book";
  }

  // C from CRUD : Create One New
  create = (book) => {
    const { title, author, year, description, pages } = book;
    return db.execute(`INSERT INTO ${this.table} (title, author, year, description, pages) VALUES (?, ?, ?, ?, ?)`,
    [
      title,
      author,
      year,
      description,
      pages
    ]);
  };

  // R from CRUD : Get All With Filters
  getAll = (req) => {
    let baseSql = `SELECT * FROM ${this.table}`;
    const sqlValues = [];

    if (req.query.year) {
      sqlValues.push({
        criteria: "year =",
        value: req.query.year
      });
    }

    if (req.query.max_page) {
      sqlValues.push({
        criteria: "page <=",
        value: req.query.max_page
      });
    }

    if (req.query.min_page) {
      sqlValues.push({
        criteria: "page >=",
        value: req.query.min_page
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
  getById = (id) => {
    return db.execute(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  };


  //U from CRUD : Update One By ID
  updateById = (book) => {
    const { title, author, year, description, pages, id } = book;
    return db.execute(`UPDATE ${this.table} SET title = ?, author = ?, year = ?, description = ?, pages = ? WHERE id = ?`,
    [ 
      title,
      author,
      year,
      description,
      pages,
      id
    ]);
  };

  //D from CRUD : Delete One By ID
  deleteById = (id) => {
    return db.execute(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  };

};

module.exports = new BookModel();