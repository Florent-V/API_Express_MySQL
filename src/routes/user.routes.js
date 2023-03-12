const userHandler = require('../controllers/user.controller');
const router = require('express').Router();

const validator2 = require('../middleware/express_validator');
const { hashPassword, verifyPassword, verifyToken, verifyAccess } = require("../middleware/auth");

router.get("/api/users", userHandler.getUsers);
router.get("/api/users/:id", userHandler.getUserById);

router.post("/api/users", validator2.validateUserExpress, hashPassword, userHandler.addUser);
router.post("/api/login", userHandler.getUserByEmailWithPassword, verifyPassword);

router.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

router.put("/api/users/:id", verifyAccess, validator2.validateUserExpress, hashPassword, userHandler.updateUser);
router.delete("/api/users/:id", verifyAccess, userHandler.deleteUser);

module.exports = router;