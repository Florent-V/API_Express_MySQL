const db = require('./database');

//constructor
class UserModel {
  constructor() {
    this.table = "user";
  }

  // C from CRUD : Create One New
  create = (user) => {
    const { firstname, lastname, email, city, language, hashedPassword } = user;
    return db.execute(`INSERT INTO ${this.table} (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      firstname,
      lastname,
      email,
      city,
      language,
      hashedPassword
    ]);
  };

  // R from CRUD : Get All With Filters
  getAll = (req) => {
    let baseSql = `SELECT id, firstname, lastname, email, city, language FROM ${this.table}`;
    const sqlValues = [];

    if (req.query.firstname) {
      sqlValues.push({
        criteria: "firstname =",
        value: req.query.firstname
      });
    }

    if (req.query.lastname) {
      sqlValues.push({
        criteria: "lastname =",
        value: req.query.lastname
      });
    }

    if (req.query.city) {
      sqlValues.push({
        criteria: "city =",
        value: req.query.city
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
    return db.execute(`SELECT id, firstname, lastname, email, city, language FROM ${this.table} WHERE id = ?`, [id]);
  };

  //U from CRUD : Update One By ID
  updateById = (user) => {
    const { firstname, lastname, email, city, language, hashedPassword, id } = user;
    return db.execute(`UPDATE ${this.table} SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?`,
    [ 
      firstname,
      lastname,
      email,
      city,
      language,
      hashedPassword,
      id
    ]);
  };

  //D from CRUD : Delete One By ID
  deleteById = (id) => {
    return db.execute(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  };
}

module.exports = new UserModel();