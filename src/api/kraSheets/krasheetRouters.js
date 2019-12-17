var express = require("express");
var router = express.Router();
const userauth = require("../middleware/userauth");
const common = require("../middleware/common");
const { Addkra } = require("../kraSheets/kraSheetcontroller/addkraSheet");
const { Viewkra } = require("../kraSheets/kraSheetcontroller/viewkrasheet");
const {
  viewkramanager
} = require("../kraSheets/kraSheetcontroller/viewkramanager");
const {
  updatekramanager
} = require("../kraSheets/kraSheetcontroller/updateKraSheet");
const {
  viewKramanagerUser
} = require("../kraSheets/kraSheetcontroller/viewKramanagerUSER");

router.post("/user/addkra", userauth, Addkra);
router.get("/user/viewkra/:year", userauth, Viewkra);
router.get("/manager/viewkra", common, viewkramanager);
router.post("/manager/updatekra", common, updatekramanager);
router.get("/manager/viewkrauser/:id", common, viewKramanagerUser);

module.exports = router;
