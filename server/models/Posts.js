const mongoose = require("../db/connection");
const { Schema } = require("mongoose");

const Post = mongoose.model(
  "Post",
  new Schema(
    {
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: "",
      },
      likes: {
        type: Array,
        default: [],
      },
      comments: {
        type: Array,
        default: [],
      },
      userId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      userImage: {
        type: String
      },
    },
    { timestamps: true }
  )
);

module.exports = Post;
