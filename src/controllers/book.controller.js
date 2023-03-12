const Book = require("../models/book.model");

const bookController = {};

// Create and Save a new Book
bookController.create = (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
  }

  const book = {
    ...req.body
  };

  // Save Book in the database
  Book.create(book)
    .then(([result]) => {
      res.status(201).json({ id: result.insertId, message: "Book Created" });
      //res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error saving the book",
        msg: err
      });
      next(err);
    });
};

// R from CRUD : Get All With Filters
bookController.getAll = (req, res, next) => {
  console.log(req.query);
  Book.getAll(req)
    .then(([books]) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
      next(err);
    });
};

//R from CRUD : Get One By ID
bookController.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  Book.getById(id)
    .then(([book]) => {
      (book[0]) ? res.status(200).json(book[0]) : res.status(404).send('Not Found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error retrieving data from database",
        msg: err
      });
      next(err);
    });
};

//U from CRUD : Update One By ID
bookController.updateById = (req, res, next) => {

  if (!req.body) {
    res.status(400).json({message: "Content cannot be empty !"});
  }

  const id = parseInt(req.params.id);

  const book = {
    ...req.body,
    id,
  };

  Book.updateById(book)
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
bookController.deleteById = (req, res, next) => {
  const id = req.params.id;
  Book.deleteById(id)
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



module.exports = bookController;