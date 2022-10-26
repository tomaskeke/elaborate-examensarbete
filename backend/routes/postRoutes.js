const express = require("express");
const router = express.Router();
const {
  getEventPost,
  setEventPost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id/posts").post(protect, setEventPost);
router.route("/:id/posts").get(protect, getEventPost)

module.exports = router;
