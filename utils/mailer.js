var nodemailer = require("nodemailer");
const jwt = require("jwt-simple");
module.exports = function(email, token,verify) {
  const decoded = jwt.decode(token, "secretKey");
  const name = decoded.userdata.name;
  const date = new Date().getFullYear();
  var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    host: "mail.vinove.com",
    secure: false,
    port: 587,
    auth: {
      user: "milan.srivastava@mail.vinove.com",
      pass: "milan@2019"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const message1 = `You requested for a password reset, kindly use this ${verify} to reset your password`;

  var mailOptions = {
    from: "milan.srivastava@mail.vinove.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: `Please click this link ${verify} to approve your login with email:"${email}",temporary password:"${name +
      date}". Please change your password after logging in `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
