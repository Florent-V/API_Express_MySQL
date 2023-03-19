const router = require('express').Router();

const userController = require('../controllers/user.controller');
const validator = require('../middleware/express_validator');

const { hashPassword, verifyPassword, verifyToken, verifyAccess } = require("../middleware/auth");

//Route /api/users

router.get("/", userController.getAll);
router.get("/:id", userController.getById);

router.post("/", hashPassword, userController.create);
router.put("/:id", hashPassword, userController.updateById);
router.delete("/:id", userController.deleteById);

/*
router.post("/api/users", validator2.validateUserExpress, hashPassword, userHandler.addUser);
router.post("/api/login", userHandler.getUserByEmailWithPassword, verifyPassword);

router.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

router.put("/api/users/:id", verifyAccess, validator2.validateUserExpress, hashPassword, userHandler.updateUser);
router.delete("/api/users/:id", verifyAccess, userHandler.deleteUser);*/

module.exports = router;