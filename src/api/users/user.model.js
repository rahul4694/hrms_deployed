const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    AutoIncrement: true,
    primaryKey: true
  },
  prefix: {
    type: String,
    default: "A"
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    retuired: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot contain 'password' ");
      }
    }
  },
  designation_id: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    required: true,
    ref: "Designation"
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "Department"
  },
  reportingManager: {
    type: Number,
    ref: "User"
  },

  dateOfJoining: {
    type: Date,
    default: new Date()
  },

  jobStatus: {
    type: String,
    default: "working"
  },
  gender: {
    type: String
  },
  kraAttributes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "kraAttributes"
    }
  ],
  token: {
    type: String,
    default: ""
  },
  filledKra: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(AutoIncrement, { inc_field: "_id", start_seq: 1000 });

userSchema.pre("save", async function(next) {
  const user = this;
  if (!user.password) {
    user.password = (await user.name) + user.dateOfJoining.getFullYear();
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
