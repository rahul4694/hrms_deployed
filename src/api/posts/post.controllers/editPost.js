const Post = require("../post.model");
const { validationResult } = require("express-validator");

const editpost = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.id,
      {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description
      },
      { new: true }
    );
    res.status(200).send(post)
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ msg: e.message });
  }
};

module.exports = editpost;
