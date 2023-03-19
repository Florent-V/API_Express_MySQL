const User = require('../models/user.model');

const userController = {};

// Create and Save a new User
userController.create = (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
  }

  const user = {
    ...req.body
  };

  // Save User in the database
  User.create(user)
    .then(([result]) => {
      res.status(201).json({ id: result.insertId, message: "User Created" });
      //res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error saving the user",
        msg: err
      });
      next(err);
    });
};

// R from CRUD : Get All With Filters
userController.getAll = (req, res, next) => {
  console.log(req.query);
  User.getAll(req)
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Error retrieving data from database",
        msg: err
      });
      next(err);
    });
};

//R from CRUD : Get One By ID
userController.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  User.getById(id)
    .then(([user]) => {
      (user[0] ? res.status(200).json(user[0]) : res.status(404).send('Not Found'));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Error retrieving data from database",
        msg: err
      });
      next(err);
    });
};

//R from CRUD : Get One By Email
userController.getUserByEmailWithPassword = (req, res, next) => {
  const { email } = req.body;

  User.getByEmail(email)
    .then(([user]) => {
      if (user[0]) {
      req.user = user[0];
      next()
    } else {
      res.status(401).send("Unauthorized");
    }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "Error retrieving data from database",
        msg: err
      });
      next(err);
    });
};



//U from CRUD : Update One By ID
userController.updateById = (req, res, next) => {

  if (!req.body) {
    res.status(400).json({message: "Content cannot be empty !"});
  }

  const id = parseInt(req.params.id);

  const user = {
    ...req.body,
    id,
  };

  User.updateById(user)
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error editing data from database",
        msg: err
      });
      next(err);
    });
};

//D from CRUD : Delete One By ID
userController.deleteById = (req, res, next) => {
  const id = parseInt(req.params.id);
  User.deleteById(id)
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error deleting data from database",
        msg: err
      });
      next(err);
    });
};





const addUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};


const updateUser = (req, res) => {
  const {firstname, lastname, email, city, language, hashedPassword} = req.body;
  const id = parseInt(req.params.id);

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE  id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      result.affectedRows ? res.sendStatus(204) : res.status(404).send("Not Found");
    })
    .catch((err) => {
      console.error(err);
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

module.exports = userController;