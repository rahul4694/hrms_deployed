const User = require("../user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const changePass = async (req, res, next) => {
  try {
    const email = req.body.credential.email;
    const oldpassword = req.body.credential.oldpassword;
    const newpassword = req.body.credential.newpassword;

    User.findOne({ email }).then(async user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json("Email not found");
      }
      // Check password
      const isMatch = await bcrypt.compare(oldpassword, user.password);

      if (isMatch) {
        const newpass = await bcrypt.hash(newpassword, 8);

        user.password = newpass;
        user.save();

        return res.status(200).json({error:"Password changed successfully"});
      } else {
        res.status(400).json({error:"Email or Password does not match"});
      }
    });
  } catch (e) {
    console.log("err", e);
    res.status(400).json({error:"Email or Password does not match"});
  }
};
module.exports = { changePass };
