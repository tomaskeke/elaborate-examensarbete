const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUser,
  getUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;
