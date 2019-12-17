const { validationResult } = require("express-validator");
const Post = require("../post.model");
const addpost = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = new Post({
      ...req.body
    });
    post.userId = req._id;
    post.userName = req.user.name;
    await post.save();
    const postlist=await Post.find({}).sort({date:-1}).limit(10) 
    res.status(200).json(postlist);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ msg: e.message });
  }
};

module.exports = addpost;
