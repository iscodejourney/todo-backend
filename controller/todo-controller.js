const asyncHandler = require("express-async-handler");
const { Todo } = require("../moduls/todo.js");
const { User } = require("../moduls/users.js");
const { ObjectId } = require('mongoose').Types;







module.exports.newTodo = asyncHandler(async (req, res) => {
    const message = req.body.todoText;
    if(!message){
      return res.status(400).json("please write your todo before sending")
    }
    const userId = req.body.id; 

    
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }
    
    try {

        const existingTodo = await Todo.findOne({ todo: message });
        if (existingTodo && existingTodo.user.toString() === userId) {
            return res.status(400).json({ message: 'This todo has already been added by another user.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const newTodo = new Todo({ todo: message, user: userId });
        await newTodo.save();
    
        user.todos.push(newTodo._id);
        await user.save();
    
        res.status(201).json(newTodo);
    } catch (err) {
        console.error("Error in creating a new Todo:", err); 
        res.status(500).json({ message: `error : ${err.message}` });
    }
    
});






module.exports.updateTodo = asyncHandler(async (req, res) => {  
    const todoId = req.body.id.trim(); 
    console.log(todoId);
    
    
    if (!ObjectId.isValid(todoId)) {
        return res.status(400).json({ message: 'Invalid todo ID' });
    } 
    const todo = await Todo.findById(todoId)
    const updatetodo = await Todo.findByIdAndUpdate(todoId ,{
        $set : {
            todo : req.body.todo ? req.body.todo : todo.todo ,
        }
    }, {new : true})
    res.status(200).json(updatetodo)
});






module.exports.todoFinsh = asyncHandler(async (req, res) => {  
    const todoId = req.body.id;
    console.log(todoId);
    
    if (!todoId || !ObjectId.isValid(todoId)) {
        return res.status(400).json({ message: 'Invalid todo ID' });
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
        $set: {
            isFinished: req.body.isFinished !== undefined ? req.body.isFinished : todo.isFinished,
        }
    }, { new: true });

    res.status(200).json(updatedTodo.isFinished);
});





module.exports.deleteTodo = asyncHandler(async (req, res) => {
    const todoId = req.query.id.trim();

    if (!ObjectId.isValid(todoId)) {
        return res.status(400).json({ message: 'Invalid todo ID' });
    }

    const todo = await Todo.findById(todoId);
    
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    let user = await User.findById(todo.user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {
        await Todo.findByIdAndDelete(todoId);

        user.todos = user.todos.filter(todo => todo.toString() !== todoId);

        await user.save();
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error: " + error.message });
    }
}); 

module.exports.getAllTodos = asyncHandler(async (req, res) => {
    try {
        let todos = await Todo.find( {user : req.query.id});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "  we are sorry we have an errore "+error });
    }
});