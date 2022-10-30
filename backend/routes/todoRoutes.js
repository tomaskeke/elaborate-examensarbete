const express = require("express");
const { getEventTodos } = require("../controllers/eventController");
const router = express.Router();
const {
  getUserTodos,
  getOneTodo,
  addTodoList,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getEventTodos);
router.route("/:id").get(protect, getOneTodo);
router.route("/").post(protect, addTodoList);
module.exports = router;
