const jwt = require("jwt-simple");
const User = require("../user.model");
const NotificationModel = require("../../notification/notification.model");
const NotificationType = require("../../notification/notificationType.model");
const verifyLogin = async (req, res, next) => {
  try {
    const decodedtoken = jwt.decode(req.params.token, "secretKey");

    const { userdata } = decodedtoken;

    const user = new User(userdata);
    const u = await User.findOne({ email: user.email });
    if (!u) {
      await user.save();
      const notificationtype = await NotificationType.findOne({
        type: "User Verified"
      });
      const notification = new NotificationModel({
        to: 1000,
        from: user._id,
        typeId: notificationtype._id
      });
      await notification.save();
    }

    res.redirect("http://localhost:3000");
    // res.redirect("http://kra.n1.iworklab.com");
  } catch (e) {
    console.log(e.message);
    res.status(500).send("server error");
  }
};
module.exports = { verifyLogin };
