//Route /api/movies
const router = require("express").Router();

const movieController = require('../controllers/movie.controller');
const validator = require('../middleware/express_validator');
const { verifyToken, verifyAccess } = require("../middleware/auth");


router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken) 

router.post("/", validator.validateMovieExpress, movieController.create);
router.put("/:id", validator.validateMovieExpress, movieController.updateById);
router.delete("/:id", movieController.deleteById);

module.exports = router;
