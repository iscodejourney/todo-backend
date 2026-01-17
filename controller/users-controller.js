const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs"); 
const { User, validateUser } = require("../moduls/users.js");

module.exports.registerNewUser = asyncHandler(async (req, res) => {
    const { error } =  validateUser(req.body); 
    console.log(await req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10); 
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        password: hashPassword,
    });

    await user.save();
    res.status(200).json({ message: "Registration successful, please login" });
});

module.exports.loginController = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ message: " the username is undefined " });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "your password is false" });
    }
    const id = user._id 
    res.status(200).json({ message: `Welcome back ${req.body.username}` , userId : id ,username : user.username});
     
});

