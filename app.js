const express = require("express");

const connectToDB = require("./config/config.js");

require("dotenv").config();

const cors = require("cors")

connectToDB();

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
  }));
  
// app.use("/api/auth" , require("./router/router.js"))
 app.use("/api" , require("./router/users-router.js"))
 app.use("/api" , require("./router/todo-router.js"))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
