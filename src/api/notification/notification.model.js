const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  from: {
    type: Number,
    ref: "User"
  },

  to: {
    type: Number,
    ref: "User"
  },

  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notificationType"
  },
  date: {
    type: Date,
    default: new Date()
  },
  read: {
    type: Boolean,
    default: false
  }
});

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
