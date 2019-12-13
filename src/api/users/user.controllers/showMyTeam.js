const User = require("../user.model");
const showMyTeam = async (req, res) => {
  try {
    const teamarr = await User.find({ reportingManager: req._id });
    const teamlen = teamarr.length;
    const skip = Number(req.skip);
    const team = await User.find({ reportingManager: req._id })
      .populate("designation_id  department_id ", ["name"])
      .select("prefix name designation_id department_id jobStatus gender")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(3);

    res.send({ team, teamlen });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server Error");
  }
};
module.exports = { showMyTeam };
