const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Event = require("../model/eventModel");
// @desc    Register new user
// @route POST /api/users
// @access Public

// generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { fName, lName, email, password } = req.body;

  if (!fName || !lName || !email || !password) {
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
    fName,
    lName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fName: user.fName,
      lName: user.lName,
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

  if (password === undefined) {
    res.status(400);
    throw new Error("Please enter a password");
  }
  //check for user email
  let user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user) {
    res.status(400);
    throw new Error("Invalid email address");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid password");
  }

  res.json({
    _id: user.id,
    fName: user.fName,
    lName: user.lName,
    fullName: user.fName + " " + user.lName,
    email: user.email,
    token: generateToken(user._id),
    avatar: user.avatar,
    profilebackground: user.profilebackground,
    desc: user.desc,
    subscriptions: user.subscriptions,
    age: user.age,
    pending: user.pending,
    initPending: user.initPending,
    friendsList: user.friendsList,
    createdAt: user.createdAt,
  });
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
  const users = await User.find().select({
    initPending: 1,
    eventPending: 1,
    pending: 1,
    fName: 1,
    lName: 1,
  });
  res.status(200).json(users);
});

const findUsers = asyncHandler(async (req, res) => {
  RegExp.escape = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  let pattern = new RegExp("^[^@s]*" + RegExp.escape(req.body.query));
  const matchedUsers = await User.find({
    $or: [
      { email: { $regex: pattern, $options: "i" } },
      { fName: { $regex: pattern, $options: "i" } },
    ],
  });

  if (!matchedUsers) {
    res.status(400);
    throw new Error("No matches found");
  }

  res.status(200).json(matchedUsers);
});

// @desc GET user by id
// @route get /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  const {
    _id,
    fName,
    lName,
    email,
    avatar,
    desc,
    subscriptions,
    profilebackground,
    initPending,
    pending,
    eventPending,
    age,
    friendsList,
    createdAt,
  } = await User.findById(req.params.id).select({id: 1, fname: 1, lname: 1, email: 1, avatar: 1, initPending: 1, pending: 1, eventPending: 1, subscriptions: 1, friendsList: 1});
  res.status(200).json({
    id: _id,
    fName,
    lName,
    email,
    avatar,
    profilebackground,
    initPending,
    pending,
    eventPending,
    desc,
    subscriptions,
    age,
    friendsList,
    createdAt,
  });
});

const sendFriendRequest = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const recipientId = req.params.id;

  const recipient = await User.findById({ _id: recipientId }).select({
    pending: 1,
    initPending: 1,
  });
  const user = await User.findById({ _id: id }).select({
    pending: 1,
    initPending: 1,
  });

  if (recipientId === id) {
    res.status(400);
    throw new Error("You can't send a friend request to yourself");
  }
  if (Object.values(recipient?.pending).includes(id)) {
    res.status(400);
    throw new Error("already pending request");
  }
  if (Object.values(recipient?.initPending).includes(id)) {
    res.status(400);
    throw new Error("already pending request");
  }
  if (recipient?.friendsList?.includes(id)) {
    res.status(400);
    throw new Error("already friends");
  }

  const updateRecipient = await User.findOneAndUpdate(
    {
      _id: recipientId,
    },
    { $push: { pending: [id] } },
    { new: true }
  );

  const updateRequester = await User.findOneAndUpdate(
    { _id: id },
    { $push: { initPending: [recipientId] } },
    { new: true }
  );
  res.status(201).json([{ id: recipientId }]);
});

const getInitializedRequests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select({
    pending: 1,
    initPending: 1,
  });

  const requests = await User.find({ _id: { $in: user.initPending } });

  if (!requests) {
    res.status(400).json("No friend requests found");
  }

  res.status(200).json(requests);
});

const getFriendRequests = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select({
    pending: 1,
    initPending: 1,
  });

  const requests = await User.find({ _id: { $in: user.pending } });

  if (!requests) {
    res.status(400).json("No friend requests found");
  }

  res.status(200).json(requests);
});

const getFriendsListObjects = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user.friendsList) {
    res.status(400);
    throw new Error("You have no friends");
  }
  const users = await User.find({ _id: { $in: user.friendsList } });

  res.status(200).json(users);
});

const getEventInvites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select({
    eventPending: 1,
  });
  const pendingRequests = await Event.find({ _id: { $in: user.eventPending } });

  if (!pendingRequests) {
    return res.status(400).json("No invites found");
  }
  res.status(200).json(pendingRequests)
});


const acceptEventInvite = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const requesterId = req.body.id;

  // update user with new event subscription
  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $push: { subscriptions: requesterId } },
    { new: true }
  );

  //update event with new member
  const updateRequester = await Event.findOneAndUpdate(
    { _id: requesterId },
    { $push: { members: id } },
    { new: true }
  );

  // remove id's from eventPending / initPending array on user object.
  if (updateUser) {
    const removePendingUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { eventPending: { $in: [requesterId] } } },
      { new: true }
    );
    if (updateRequester) {
      const removeinitPending = await Event.findOneAndUpdate(
        { _id: requesterId },
        { $pull: { initPending: { $in: [id] } } },
        { new: true }
      );
    }
  }
  // Response with object to handle in frontend.
  const requesterEventObject = await Event.findById(requesterId);

  res.status(201).json(requesterEventObject);
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const requesterId = req.params.id;

  // update user with new friend
  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $push: { friendsList: [requesterId] } },
    { new: true }
  );

  //update requester with new friend
  const updateRequester = await User.findOneAndUpdate(
    { _id: requesterId },
    { $push: { friendsList: [id] } },
    { new: true }
  );

  // remove id's from pending / initPending array on user object.
  if (updateUser) {
    const removePendingUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { pending: { $in: [requesterId] } } },
      { new: true }
    );
    if (updateRequester) {
      const removeinitPendingRequester = await User.findOneAndUpdate(
        { _id: requesterId },
        { $pull: { initPending: { $in: [id] } } },
        { new: true }
      );
    }
  }

  // Response with object to handle in frontend.
  const requesterUserObject = await User.findById(requesterId);

  res.status(201).json(requesterUserObject);
});

const declineFriendRequest = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const requesterId = req.params.id;

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { pending: { $in: [requesterId] } } },
    { new: true }
  );
  const updateRequester = await User.findOneAndUpdate(
    { _id: requesterId },
    { $pull: { initPending: { $in: [id] } } },
    { new: true }
  );
  res.status(201).json({ id: requesterId });
});

const cancelPendingRequest = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const requesterId = req.params.id;

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { initPending: { $in: [requesterId] } } },
    { new: true }
  );
  const updateRequester = await User.findOneAndUpdate(
    { _id: requesterId },
    { $pull: { pending: { $in: [id] } } },
    { new: true }
  );
  res.status(201).json({ id: requesterId });
});

const removeFriend = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const friendId = req.params.id;

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { friendsList: { $in: [friendId] } } },
    { new: true }
  );
  const updateRequester = await User.findOneAndUpdate(
    { _id: friendId },
    { $pull: { friendsList: { $in: [id] } } },
    { new: true }
  );
  res.status(200).json({ id: friendId });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUser,
  getUsers,
  getEventInvites,
  findUsers,
  sendFriendRequest,
  getFriendRequests,
  getInitializedRequests,
  getFriendsListObjects,
  acceptFriendRequest,
  acceptEventInvite,
  declineFriendRequest,
  cancelPendingRequest,
  removeFriend,
};
