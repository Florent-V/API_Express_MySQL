const router = require("express").Router();

const bookController = require('../controllers/book.controller');
const validator = require('../middleware/express_validator');

//Route /api/books

// Retrieve all books
router.get("/", bookController.getAll);
// Retrieve a single book with id
router.get("/:id", bookController.getById);
// Create a new Book
router.post("/", validator.validateBookExpress, bookController.create);
// Update a book with id
router.put("/:id", validator.validateBookExpress, bookController.updateById);
// Delete a Book with id
router.delete("/:id", bookController.deleteById);

module.exports = router;