const Post = require("../post.model");

const getpost = async (req, res, next) => {
  try {
    const postlist = await Post.find({})
      .sort({ date: -1 })
      .skip(Number(req.skip))
      .limit(10);
    res.status(200).json(postlist);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ msg: e.message });
  }
};

module.exports = getpost;
