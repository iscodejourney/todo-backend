const mongoose = require("mongoose");
require("dotenv").config()

module.exports = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("is connect")
    }catch(err){
        console.log(`mongoDB is not connect : ${err}`)
    }
}