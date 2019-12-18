const Post = require("../post.model");
const { validationResult } = require("express-validator");

const addcomments = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = await Post.findById(req.id);
    post.comments.unshift({ userId: req._id, msg: req.body.comment });
    await post.save();
    res.status(200).send(post.comments);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: e.message });
  }
};

const handlelikes = async (req, res, next) => {
  try {
    const post = await Post.findById(req.id);

    post.likes.indexOf(req._id) !== -1
      ? (post.likes = post.likes.filter(e => e !== req._id))
      : post.likes.unshift(req._id);
    await post.save();

    res.status(200).send(post.likes);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: e.message });
  }
};

module.exports = { addcomments, handlelikes };
