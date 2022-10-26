const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    comments: { 
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
      },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
