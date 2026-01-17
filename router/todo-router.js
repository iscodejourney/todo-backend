const router = require("express").Router();

const { newTodo , updateTodo , todoFinsh , deleteTodo, getAllTodos}= require("../controller/todo-controller.js")


router.post("/newTodo" , newTodo)
router.put("/updateTodo" , updateTodo)
router.put("/todoFinsh" , todoFinsh)
router.delete("/deleteTodo" , deleteTodo)
router.get("/getAllTodo" , getAllTodos)
module.exports = router