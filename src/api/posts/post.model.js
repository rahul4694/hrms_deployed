const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  likes: [],
  comments: []
});
module.exports = mongoose.model("postModel", postSchema);
