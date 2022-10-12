const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc    Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  //
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  let user = await User.findOne({ email: req.body.email });
  if (!user){
    res.status(400)
    throw new Error("Invalid email address")
  }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword){
    res.status(400)
    throw new Error("Invalid password");
  } 

   res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profilepicture: user.profilepicture,
      desc: user.desc,
      followers: user.followers,
      subscriptions: user.subscriptions,
      age: user.age,
    })
});

// @desc    Get user data
// @route get /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc GET all users
//@route GET /api/users/

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
// @desc GET user by id
// @route get /api/users/:id

const getUser = asyncHandler(async (req, res) => {
  const { _id, name, profilepicture, desc, subscriptions, age } =
    await User.findById(req.params.id);
  res.status(200).json({
    id: _id,
    name,
    profilepicture,
    desc,
    subscriptions,
    age,
  });
});

// generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUser,
  getUsers,
};
