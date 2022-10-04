const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profilepicture: {
      type: String,
      default:
        "https://www.enadglobal7.com/wp-content/uploads/2021/09/blank-profile-picture-973460_640.png",
    },
    subscriptions: {
      type: Array,
      default: [],
    },
    age: {
      type: Number,
      default: null,
    },
    desc: {
      type: String,
      max: 50,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
