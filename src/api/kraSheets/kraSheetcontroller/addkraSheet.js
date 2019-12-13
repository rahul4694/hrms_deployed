const User = require("../../users/user.model");
const KraSheetModel = require("../krasheetmodel");
const NotificationModel = require("../../notification/notification.model");
const NotificationType = require("../../notification/notificationType.model");
const Addkra = async (req, res) => {

  try {
    let kra = await KraSheetModel.findOne({ userId: req.user._id });
    if (!kra) {
      kra = await new KraSheetModel({
        userId: req.user._id,
        reportingManagerId: req.user.reportingManager
      });
      kra.kraSheet.unshift({ kraAttributes: req.body.kradata });
      await kra.save();
      await User.findByIdAndUpdate(req.user._id, {filledKra:true})
      const notificationtype = await NotificationType.findOne({
        type: "KRA filled"
      });
      const notification = new NotificationModel({
        to: req.user.reportingManager,
        from: req.user._id,
        typeId: notificationtype._id
      });
      await notification.save();
      // kra=await kra.populate("kraSheet.kraAttributes[0].Attributesid",["name"])
      return res.send(kra);
    }
    const currentYear = kra.kraSheet[0].date.getFullYear();
    const currentMonth = kra.kraSheet[0].date.getMonth();

    // console.log(currentMonth==new Date().getMonth());

    if (
      currentMonth == new Date().getMonth() &&
      currentYear == new Date().getFullYear()
    ) {
      return res.status(404).send({ errmsg: "kra already done" });
    }

    kra.kraSheet.unshift({ kraAttributes: req.body.kradata});
    await kra.save();
    await User.findByIdAndUpdate(req.user._id, {filledKra:true})
    const notificationtype = await NotificationType.findOne({
      type: "KRA filled"
    });
    const notification = new NotificationModel({
      to: req.user._id,
      from: req.user.reportingManager,
      typeId: notificationtype._id
    });
    await notification.save();
    res.json(kra);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("ha");
  }
};

module.exports = { Addkra };
