var leaveType = require("../../api/leaves/leaveType.model");

async function func(req, res, next) {
  const number = await leaveType.countDocuments();
  if (number < 1) {
    var arr = [
      new leaveType({
        name: "Sick Leave"
      }),
      new leaveType({
        name: "Casual Leave"
      }),
      new leaveType({
        name: "Leave without pay"
      })
    ];
    for (var i = 0; i < arr.length; i++) {
      arr[i].save();
    }
  }
}
func();
module.exports = func;
