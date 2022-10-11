const asyncHandler = require("express-async-handler");

const Event = require("../model/eventModel");
const User = require("../model/userModel");
const Post = require("../model/postModel");

const getEventPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(400).json("Post not found");
  }
  res.status(200).json(post);
});

const setEventPost = asyncHandler(async (req, res) => {
  if (!req.body.content || !req.body.title) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const post = await Post.create({
    userId: req.user.id,
    event: req.params.id,
    content: req.body.content,
    title: req.body.title,
  });

  Event.updateOne(
    { _id: req.params.id },
    { $push: { posts: post } },
    (error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );

  res.status(200).json(post);
});

module.exports = {
  setEventPost,
  getEventPost,
};
