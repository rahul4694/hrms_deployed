const KraSheetModel = require("../krasheetmodel");
const NotificationModel = require("../../notification/notification.model");
const NotificationType = require("../../notification/notificationType.model");
const updatekramanager = async (req, res) => {
  
  try {
    const { userId, krasheetId, kraAttributes } = req.body;
    let kra2 = await KraSheetModel.findOne(
      { "kraSheet._id": krasheetId },
      { "kraSheet.$": 1 }
    );
    if (kra2.kraSheet[0].Status === "Approved") {
      return res.status(404).send("Kra Already Status");
    }

    kra = await KraSheetModel.findOneAndUpdate(
      { "kraSheet._id": krasheetId },
      {
        $set: {
          "kraSheet.$.Status": "Approved",
          "kraSheet.$.kraAttributes": kraAttributes
        }
      },
      {
        new: true
      }
    );
    const notificationtype = await NotificationType.findOne({
      type: "KRA Approved"
    });

    const notification = new NotificationModel({
      to: userId,
      from: req.user._id,
      typeId: notificationtype._id
    });
    await notification.save();

    res.json(kra);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server");
  }
};
module.exports = { updatekramanager };
