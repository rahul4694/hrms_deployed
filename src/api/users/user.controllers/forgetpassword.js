const User = require("../user.model");
const mailer = require("../../../../utils/mailer");
const jwt = require("jwt-simple");

const forget = async (req, res, next) => {
  // const user = await User.findByCredentials(req.body.email)
  try {
    const user = await User.findOne({ email: req.body.email });
    const userEmail = user.email;

    let date = new Date();
    let time = date.getTime();
    token = jwt.encode({ userEmail, time }, "secretKey");

    const verify = `http://localhost:5000/verify/${token}`;
    await mailer(userEmail, verify);

    res.send(verify);
    next();
  } catch (err) {
    console.log(err.message);
    res.send("Email does not exist");
  }
};

module.exports = { forget };
