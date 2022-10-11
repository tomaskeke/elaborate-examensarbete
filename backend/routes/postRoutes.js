const express = require("express");
const router = express.Router();
const {
  getEventPosts,
  getEventPost,
  setEventPost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id/posts").post(protect, setEventPost);
router.route("/:id/posts/:postId").get(getEventPost)

module.exports = router;
