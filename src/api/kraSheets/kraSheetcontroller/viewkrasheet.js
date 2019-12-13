const User = require("../../users/user.model");
const KraSheetModel = require("../krasheetmodel");
const Viewkra = async (req, res) => {

  try {
    let kra = await KraSheetModel.findOne({ userId: req._id }).select("-_id");
    if (!kra) {
      return res.status(400).json({error:"No Kra found"});
    }

    kra = kra.kraSheet.filter(e => {
      return e.date.getFullYear() == req.params.year;
    });

    res.json(kra);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server");
  }
};

module.exports = { Viewkra };
