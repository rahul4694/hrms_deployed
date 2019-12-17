(function() {
  "use strict";
  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;
  var leaveTypeSchema = new Schema({
    name: { type: String }
  });

  const leaveType = mongoose.model("leaveType", leaveTypeSchema);
  module.exports = leaveType;
})();
