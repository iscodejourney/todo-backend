const mongoose = require('mongoose');
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        minlength: 5,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true,
});

function validateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().required().min(5).max(100).trim(),
        password: Joi.string().required().min(8).trim(),
    });

    return schema.validate(obj);
}

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    validateUser,
};
