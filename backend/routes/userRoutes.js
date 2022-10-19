const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUser,
  getUsers,
  sendFriendRequest,
  getInitializedRequests,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  cancelPendingRequest,
  getFriendsListObjects,
  findUsers
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/search", findUsers)
router.post("/:id/addfriend", protect, sendFriendRequest);
router.post("/:id/acceptfriend", protect, acceptFriendRequest)
router.post("/:id/cancelpending", protect, cancelPendingRequest)
router.post("/:id/declinefriend", protect, declineFriendRequest)
router.post("/:id/removefriend", protect, removeFriend)
router.get("/friendrequests", protect, getFriendRequests)
router.get("/sentfriendrequests", protect, getInitializedRequests)
router.get("/friendslist", protect, getFriendsListObjects)
router.get("/me", protect, getMe);
router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;
