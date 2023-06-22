const {Router} = require("express");
const router = Router();

//external import
const registerController = require("./../../controllers/auth/registerController")
const loginController = require("./../../controllers/auth/loginController")
const emailVerifyController = require("./../../controllers/auth/emailVerifyController")
const readUserController = require("./../../controllers/auth/readUserController")
const checkLogin = require("./../../middlewares/checkLogin")

//register route
router.post("/register",registerController);

//email verification route
router.get("/emailVerify/:id",emailVerifyController)


//login route
router.post("/login",loginController);

//read user route
router.get("/readUser",checkLogin,readUserController);



module.exports = router



