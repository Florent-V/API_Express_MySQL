const database = require('./database');

const getUsers = (req, res) => {
  let baseSql = "SELECT * FROM users";
  const sqlValues = [];

  if (req.query.language) {
    sqlValues.push({
      criteria: "language =",
      value: req.query.language
    });
  }

  if (req.query.city) {
    sqlValues.push({
      criteria: "city =",
      value: req.query.city
    });
  }

  database
    .query(
      sqlValues.reduce(
        (sql, { criteria }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${criteria} ? `,
          baseSql
      ),
      sqlValues.map(({ value }) => value)
      )
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('select * from users where id = ?', [id])
    .then(([user]) => {
      user[0] ? res.status(200).json(user[0]) : res.status(404).send('Not Found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving data from database');
    })
};

const addUser = (req, res) => {
  console.log(req.body);
  const {firstname, lastname, email, city, language} = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      console.log(result);
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving the user");
    });
};


const updateUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
  const id = parseInt(req.params.id);

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE  id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error editing the user");
    });
}


const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(
      "DELETE FROM users WHERE id = ?",
      [id]
    )
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    })
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
}