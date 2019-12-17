var express = require("express");
var router = express.Router();
const userauth = require("../middleware/userauth");
const { check } = require("express-validator");
const addpost = require("./post.controllers/addPost");
const getpost = require("./post.controllers/getPost");
const deletepost = require("./post.controllers/deletePost");
const editpost = require("./post.controllers/editPost");

router.post(
  "/addpost",
  [
    userauth,
    check("title", "title is required")
      .not()
      .isEmpty(),
    check("type", "type is required")
      .not()
      .isEmpty(),
    check("description", "description is required")
      .not()
      .isEmpty()
  ],
  addpost
);
router.get("/getpost/:skip", userauth, getpost);
router.get("/deletepost/:id/:skip", userauth, deletepost);
router.post(
  "/editpost",
  [
    userauth,
    check("title", "title is required")
      .not()
      .isEmpty(),
    check("type", "type is required")
      .not()
      .isEmpty(),
    check("description", "description is required")
      .not()
      .isEmpty()
  ],
  editpost
);

module.exports = router;
