const notification = require("../../api/notification/notificationType.model");

async function func(req, res, next) {
  const number = await notification.countDocuments();
  if (number < 1) {
    var notifications = [
      new notification({
        type: "User Verified",
        msg: `has verified his/her account`
      }),
      new notification({
        type: "KRA filled",
        msg: "has filled her/his KRA"
      }),
      new notification({
        type: "KRA Approved",
        msg: "has approved your KRA"
      })
    ];
    for (var i = 0; i < notifications.length; i++) {
      notifications[i].save();
    }
  }
}
func();
module.exports = func;
