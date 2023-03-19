//Route /api/users
const router = require('express').Router();

const userController = require('../controllers/user.controller');
const validator = require('../middleware/express_validator');
const { hashPassword, verifyPassword, verifyToken, verifyAccess } = require("../middleware/auth");


router.get("/", userController.getAll);
router.get("/:id", userController.getById);

router.post("/", validator.validateUserExpress, hashPassword, userController.create);

router.post("/login", userController.getUserByEmailWithPassword, verifyPassword);

router.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

router.put("/:id", verifyAccess, validator.validateUserExpress, hashPassword, userController.updateById);
router.delete("/:id", verifyAccess, userController.deleteById);

module.exports = router;