const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5,
    },
    isFinished: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, {
    timestamps: true,
});


const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
    Todo,
};
