const User = require("../../users/user.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mailer = require("../../../../utils/mailer");

const addUser = async (req, res, next) => {
  const errors = validationResult(req.body.userdata);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  try {
    const newUser = { ...req.body.userdata };
    if (!newUser.name || !newUser.email || !newUser.gender) {
      return res
        .status(500)
        .json("name email and gender all fields are required");
    } else if (newUser.email) {
      const ins = await User.findOne({ email: newUser.email });
      if (ins) {
        return res.status(500).json("email id already exists");
      }
    } else if (!newUser.designation || !newUser.department) {
      return res
        .status(500)
        .json("designation and department both are required");
    } else if (!newUser.reportingManager._id) {
      return res.status(500).json("reporting manager required");
    }
    newUser.reportingManager = Number(newUser.reportingManager._id);
    if (newUser.kraAttributes.length < 1) {
      return res.status(500).json("kra Attributes required");
    }
    const arr = await newUser.kraAttributes.map(kra => {
      return kra._id;
    });
    newUser.kraAttributes = arr;
    const token = jwt.sign({ userdata: newUser }, "secretKey");
    const email = newUser.email;
    // const verify = `http://kra.n1.iworklab.com:3006/user/verifylogin/${token}`;
    const verify = `http://localhost:3006/user/verifylogin/${token}`;


    ////// verification msg for developers/////////
    console.log("verify", verify);

    // await mailer(email, token, verify);

    res.status(200).json("mail sent");
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
};

module.exports = { addUser };
