var express = require("express");
var router = express.Router();
const userauth = require("../middleware/userauth");
const { getNotification ,postNotification} = require("./notification.controller");

router.get("/getnotification/:skip", userauth, getNotification);
router.get("/postnotif/:id",userauth,postNotification)

module.exports = router;
