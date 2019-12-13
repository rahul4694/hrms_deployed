var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const adminauth = require("../middleware/adminauth");
const userauth = require("../middleware/userauth");
const common = require("../middleware/common");
const managerauth = require("../middleware/managerauth");
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
