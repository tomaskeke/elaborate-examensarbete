const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEvent,
  getEventMembers,
  getEventTodos,
  deleteEventTodo,
  getEventPosts,
  setEvent,
  updateEvent,
  updateEventAdmin,
  addEventMember,
  deleteEventMember,
  deleteEventAdmin,
  deleteEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getEvents).post(protect, setEvent);
router
  .route("/:id")
  .get(getEvent)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);
router.route("/:id/members").get(getEventMembers);
router.route("/:id/todos").get(protect, getEventTodos);
router.route("/:id/removetodo").post(protect, deleteEventTodo);
router.route("/:id/eventposts").get(getEventPosts);
router.route("/:id/addadmin").put(protect, updateEventAdmin);
router.route("/:id/addmember").put(protect, addEventMember);
router.route("/:id/removeadmin").put(protect, deleteEventAdmin);
router.route("/:id/removemember").put(protect, deleteEventMember);
module.exports = router;
