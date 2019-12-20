const Post = require("../post.model");

const getpost = async (req, res, next) => {
  try {
    console.log(req.postType, req.skip)
    const postlist = await Post.find({ type: req.postType })
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
