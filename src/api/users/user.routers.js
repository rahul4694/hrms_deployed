var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const adminauth = require("../middleware/adminauth");
const userauth = require("../middleware/userauth");
const common = require("../middleware/common");

const { login } = require("./user.controllers/loginuser");
const { logout } = require("./user.controllers/logoutuser");
const { showme } = require("./user.controllers/showProfile");
const { forget } = require("./user.controllers/forgetpassword");
const { verify } = require("./user.controllers/verifypasswrd");
const { verifyLogin } = require("./user.controllers/verifyLogin");
const { changePass } = require("./user.controllers/changepassword");
const { showMyTeam } = require("./user.controllers/showMyTeam");
const { seeds } = require("./user.controllers/seeds");
const { getuserdata } = require("./user.controllers/getuserdata");

router.post("/login", login);
router.get("/getuserdata", getuserdata);
router.get("/logout", userauth, logout);
router.get("/user/verifylogin/:token", verifyLogin);
router.get("/showme", userauth, showme);
router.post("/forgetPassword", forget);
router.get("/verify/:token", verify);
router.post("/changepassword", changePass);
router.get("/showteam/:skip", common, showMyTeam);
router.get("/getseeds", adminauth, seeds);

module.exports = router;
