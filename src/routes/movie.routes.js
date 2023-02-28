const router = require("express").Router();

const movieController = require('../controllers/movie.controller');

/*
const validator2 = require('../middleware/validator2');

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);

router.post("/", validator2.validateMovieExpress, movieController.addMovie);
router.put("/:id", validator2.validateMovieExpress, movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);*/


router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);

router.post("/", movieController.create);
router.put("/:id", movieController.updateById);
router.delete("/:id", movieController.deleteById);

module.exports = router;
