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
      required: [true, "Please add a text description"],
    },
    street_name: {
      type: String,
      required: [true, "Please add a street name"],
    },
    street_number: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    state: {
      type: String,
      required: [true, "Please add a state"],
    },
    country: {
      type: String,
      required: [true, "Please add a country"],
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: [true, "Please add a date"],
    },
    initPending: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    admin: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    todos: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Todo",
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
