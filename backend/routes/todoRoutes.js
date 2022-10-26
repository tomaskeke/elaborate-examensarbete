const express = require("express");
const router = express.Router();
const {
    getUserTodos,
    getOneTodo,
    addTodoList,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUserTodos)
router.route("/:id").get(protect, getOneTodo)
router.route("/").post(protect, addTodoList)
module.exports = router;
