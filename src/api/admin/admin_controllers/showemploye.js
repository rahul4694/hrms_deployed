const User = require("../../users/user.model");
const showEmploye = async (req, res) => {
  const userarr = await User.find({ name: { $nin: ["CEO"] } });
  const userlength = userarr.length;
  const skip = Number(req.skip);
  const user = await User.find({ name: { $nin: ["CEO"] } })
    .select("prefix name gender jobStatus")
    .sort({ _id: -1 })
    .skip(skip)
    .limit(3)
    .populate("designation_id department_id ", ["name"]);
  res.send({ user, userlength });
};
module.exports = { showEmploye };
