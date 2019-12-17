const Leave = require("../leaves.model");

const applyleave = async (req, res, next) => {
  const instance = new Leave({
    ...req.body
  });
  instance.userId = req._id;
  await instance.save();
  res.send("success");
  next();
};

const getLeave = async (req, res, next) => {
  try {
    const leave = await Leave.find({ userId: req._id })
      .populate("leaveData.type", "name")
      .select("-__v")
      .sort({ fromDate: -1 });
    if (!leave) {
      return res.status(400).send({ leaveNotpresent: "leave not present" });
    }
    res.send(leave);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
  next();
};

const deleteLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave || leave.status !== "Not Approved") {
      return res.status(400).send({ cannotdelete: "cannot delete" });
    }
    await leave.remove();
    res.send("success fully deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
  next();
};
module.exports = { applyleave, getLeave, deleteLeave };
