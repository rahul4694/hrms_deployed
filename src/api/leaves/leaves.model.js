const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User"
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  leaveType: [
    {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leaveType"
      },
      qty: Number
    }
  ],
  reason: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    default: "Not Approved"
  }
});

module.exports = leave = mongoose.model("leave", leaveSchema);
