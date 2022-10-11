const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },
    desc: {
      type: String,
      required: [true, "Please add a text value"],
    },
    user: {
      type: Array,
      default: [],
    },
    admin: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
