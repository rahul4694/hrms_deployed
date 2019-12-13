const mongoose = require("mongoose");

const notificationtypeSchema = mongoose.Schema;

const notificationtype = new notificationtypeSchema({
  type: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true,
    trim: true
  }
});

const notification = mongoose.model("notificationType", notificationtype);

module.exports = notification;
