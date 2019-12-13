const Admin = require("../user.model");
const Department = require("../../department/department.model");
const Designation = require("../../designation/designation.model");
const Kra = require("../../k.r.a_attributes/k.r.a.attr.model");

const seeds = async (req, res) => {
  try {
    const designationn = await Designation.findOne({ name: "Manager" });
    let reportingManager = await Admin.find({
      designation_id: designationn._id.toString()
    }).select("name");
    if (!reportingManager) {
      reportingManager = [];
    }
    reportingManager = [
      { _id: req.user._id, name: req.user.name },
      ...reportingManager
    ];
    const department = await Department.find().select("-__v");

    let designation = await Designation.find().select("-__v");
    designation = designation.filter(des => des.name !== "Admin");

    const kraAttributes = await Kra.find().select("-__v");
    res.json({ reportingManager, department, designation, kraAttributes });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};
module.exports = { seeds };
