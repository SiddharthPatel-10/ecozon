const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connect = require("./config/db");
const router = require("./routes/AuthRoute");

connect.connect();
dotenv.config();

//middlewares
app.use(express.json()); //this ERR, when i forgot this line :TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined.
app.use(cookieParser());

app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
