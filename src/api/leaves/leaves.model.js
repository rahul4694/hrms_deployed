const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: Number,
    req: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  leaveData: [
    {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leaveType"
      },
      qty: {
        type: Number
      }
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
