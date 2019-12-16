const jwt = require("jsonwebtoken");
const User = require("../user.model");
const Notification = require("../../notification/notification.model");
const getuserdata = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretKey");

    const user = await User.findOne({ _id: decoded.userdata._id });

    const user2 = await User.findById(user._id)
      .select("-password -__v -token")
      .populate("kraAttributes designation_id department_id reportingManager", [
        "name"
      ]);
    const length = await Notification.find({
      to: user2._id,
      read: false
    }).countDocuments();

    res.json({ userdata: user2, NotificationNumber: length });
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate" });
  }
};
module.exports = { getuserdata };
