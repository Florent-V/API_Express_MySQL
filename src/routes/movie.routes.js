const router = require("express").Router();

const movieController = require('../controllers/movie.controller');
const validator = require('../middleware/express_validator');

//Route /api/movies
router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post("/", validator.validateMovieExpress, movieController.create);
router.put("/:id", validator.validateMovieExpress, movieController.updateById);
router.delete("/:id", movieController.deleteById);

module.exports = router;
