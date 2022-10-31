const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Please add your first name"],
      min: 3,
      max: 20,
    },
    lName: {
      type: String,
      required: [true, "Please add your last name"],
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: String,
      default:
        "https://www.enadglobal7.com/wp-content/uploads/2021/09/blank-profile-picture-973460_640.png",
    },
    profilebackground: {
      type: String,
      default: "https://images.unsplash.com/photo-1567095751004-aa51a2690368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    },
    subscriptions: {
      type: [mongoose.Schema.Types.ObjectId],
      select: true,
      default: [],
    },
    eventPending: {
      type: [mongoose.Schema.Types.ObjectId],
      select: true,
      Ref: "User"
    },
    pending: {
      type: [mongoose.Schema.Types.ObjectId],
      select: false,
      ref: "User"
    },
    initPending: {
      type: [mongoose.Schema.Types.ObjectId],
      select: false,
      ref: "User"
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
    friendsList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
  },
    todoList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Todo",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
