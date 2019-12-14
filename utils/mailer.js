var nodemailer = require("nodemailer");
const jwt = require("jwt-simple");
module.exports = function (email, token, verify) {
  const decoded = jwt.decode(token, "secretKey");
  const name = decoded.userdata.name;
  const date = new Date().getFullYear();
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "gmail.com",
    auth: {
      user: "ceomern@gmail.com",
      pass: "ceomern2019"
    }
  });
  const message1 = `You requested for a password reset, kindly use this ${verify} to reset your password`;

  var mailOptions = {
    from: "ceomern@gmail.com",
    to: email,
    subject: "VALUE CODERS KRA ACCOUNT VERFICATION",
    text: `Please click this link ${verify} to approve your login for kra from VALUE_CODERS.pvt.ltd with email:"${email}",temporary password:"${name +
      date}". Please change your password after logging in `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
