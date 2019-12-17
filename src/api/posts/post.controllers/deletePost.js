const Post = require("../post.model");

const deletepost = async (req, res, next) => {
  try {
    await Post.findOneAndDelete({ _id: req.id });
    const postlist = await Post.find({})
      .sort({ date: -1 })
      .skip(Number(req.skip))
      .limit(10);
    res.status(200).json(postlist);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ deletemsg: "server error" });
  }
};

module.exports = deletepost;
