const asyncHandler = require("express-async-handler");

const Event = require("../model/eventModel");
const User = require("../model/userModel");
const Todo = require("../model/todoModel");

const getUserTodos = asyncHandler(async (req, res) => {
    const userTodos = await Todo.find({
      userId: req.user.id,
    });
    if (!userTodos) {
      res.status(400).json("No todos found");
    }
    res.status(200).json(userTodos);
  });


const addTodoList = asyncHandler(async (req, res) => {
    const {privateTodo, list, event} = req.body;
    const  user = await User.findById(req.user.id)

    if(privateTodo){
    const todoList = await Todo.create({
      userId: req.user.id,
      private: privateTodo,
      event: false,
      userDetails: user,
      todoDetails: list,
    });
    res.status(200).json(todoList);
  }

  if(event){
    const todoList = await Todo.create({
      private: false,
      event: true,
      userDetails: user,
      todoDetails: list,
    })

    const updateEvent = await Event.findOneAndUpdate(
      {_id: event}, 
      { $push: { todos:  todoList._id  } },
      { new: true }
    )
    res.status(200).json(updateEvent);
  }
})

const getOneTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        res.status(400).json("No todo found")
    }
    res.status(200).json(todo)
})

module.exports = {
    getUserTodos,
    getOneTodo,
    addTodoList,
  };
  