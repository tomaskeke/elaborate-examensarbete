const asyncHandler = require("express-async-handler");

const Event = require("../model/eventModel");
const User = require("../model/userModel");
const Post = require("../model/postModel");

// @desc    Get event
// @route GET /api/events
// @access private

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    $or: [
      { creator: req.user.id },
      { admin: [req.user.id] },
      { user: [req.user.id] },
    ],
  });

  if (!events) {
    res.status(400).json("No events found");
  }
  res.status(200).json(events);
});

const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400).json("Event not found");
  }
  res.status(200).json(event);
});

const getEventMembers = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event.user) {
    res.status(400);
    throw new Error("No event members found");
  }
  const users = await User.find({ _id: { $in: event.user } });

  res.status(200).json(users);
});

// @desc    Set events
// @route POST /api/events/:id/eventposts
// @access private
const getEventPosts = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event.posts.length > 0) {
    res.status(400);
    throw new Error("No posts found");
  }
  const posts = await Post.find({ _id: { $in: event.posts } });

  res.status(200).json(posts);
});

// @desc    Set events
// @route POST /api/events
// @access private
const setEvent = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Event must have a title");
  }
  if (!desc) {
    res.status(400);
    throw new Error("Event must have a description");
  }
  const eventExists = await Event.findOne({ title });

  if (eventExists) {
    res.status(400);
    throw new Error("Event already exists");
  }

  const event = await Event.create({
    creator: req.user.id,
    desc: req.body.desc,
    title: req.body.title,
    user: req.user.id,
    admin: req.user.id,
    posts: [],
  });
  res.status(200).json(event);
});

// @desc    Update events
// @route PUT /api/events/:id
// @access private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure logged in user matches event user
  if (event.creator.toString() !== user.id.toString()) {
    if (!event.admin.includes(user.id.toString())) {
      res.status(401);
      throw new Error("User not authorized");
    }
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEvent);
});

// @desc    Update events
// @route PUT /api/events/:id/admin
// @access private
const updateEventAdmin = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure logged in user matches event user
  if (event.creator.toString() !== user.id.toString()) {
    if (!event.admin.includes(user.id.toString())) {
      res.status(401);
      throw new Error("User not authorized");
    }
  }
  if (event.admin.includes(req.body.id)) {
    throw new Error("User is aldready admin");
  }
  const updatedEventAdmin = await Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { admin: req.body.id },
    },
    { new: true }
  );

  res.status(200).json(updatedEventAdmin);
});

//@desc Add user to event
//@route POST /api/events/:id/add
//@access private

const updateEventMember = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure logged in user matches event user
  if (event.creator.toString() !== user.id.toString()) {
    if (!event.admin.includes(user.id.toString())) {
      res.status(401);
      throw new Error("User not authorized");
    }
  }
  if (event.user.includes(user.id.toString())) {
    throw new Error("User is aldready a member");
  }
  const updatedEventUser = await Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { user: req.body.id },
    },
    { new: true }
  );

  res.status(200).json(updatedEventUser);
});

//@desc Remove user to event
//@route POST /api/events/:id/removeuser
//@access private
const deleteEventMember = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure logged in user matches event user
  if (event.creator.toString() !== user.id.toString()) {
    if (!event.admin.includes(user.id.toString())) {
      res.status(401);
      throw new Error("User not authorized");
    }
  }
  const updatedEventUser = await Event.findOneAndUpdate(
    { _id: event.id },
    {
      $pull: { user: req.body.id },
    },
    { new: true }
  );

  res.status(200).json(updatedEventUser);
});

//@desc Remove user to event
//@route POST /api/events/:id/removeadmin
//@access private
const deleteEventAdmin = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure logged in user matches event user
  if (event.creator.toString() !== user.id.toString()) {
    if (!event.admin.includes(user.id.toString())) {
      res.status(401);
      throw new Error("User not authorized");
    }
  }
  const updatedEventUser = await Event.findOneAndUpdate(
    { _id: event.id },
    {
      $pull: { admin: req.body.id },
    },
    { new: true }
  );

  res.status(200).json(updatedEventUser);
});

// @desc    Delete events
// @route DELETE /api/events/:id
// @access private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("event not found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure logged in user matches event user
  if (event.creator.toString() !== user.id.toString()) {
    res.status(401);
    console.log(user.id.toString());
    throw new Error("User not authorized");
  }
  await event.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEvents,
  getEvent,
  getEventMembers,
  getEventPosts,
  setEvent,
  updateEvent,
  updateEventAdmin,
  updateEventMember,
  deleteEventMember,
  deleteEventAdmin,
  deleteEvent,
};
