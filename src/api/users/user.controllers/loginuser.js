const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../../config/keys");
const validateLoginInput = require("../../../../validation/login");
const user = require("../../users/user.model");
const Notification = require("../../notification/notification.model");

const login = async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email

  const User = user
    .findOne({ email })
    .then(async User => {
      // Check if user exists
      if (!User) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      // Check password
      const isMatch = await bcrypt.compare(password, User.password);

      if (isMatch) {
        const user2 = await user
          .findById(User._id)
          .select("-password -__v -token")
          .populate(
            "kraAttributes designation_id department_id reportingManager",
            ["name"]
          );

        const payload = {
          userdata: { _id: user2._id }
        };
        const length = await Notification.find({
          to: user2._id,
          read: false
        }).countDocuments();
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 1 day in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              userdata: user2,
              NotificationNumber: length
            });
            user2.token = token;
            user2.save(); 
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    })
    .catch(err => {
      return res.status(400).json({ error: "Erro in logging in" });
    });
};

module.exports = { login };
