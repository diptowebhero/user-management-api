const {Router} = require("express");
const router = Router();

//external import
const registerController = require("./../../controllers/auth/registerController")
const loginController = require("./../../controllers/auth/registerController")

//register route
router.post("/register",registerController);


//login route
router.post("/login",loginController)

module.exports = router



