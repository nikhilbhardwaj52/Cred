
const path = require("path");


require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});


console.log("ENV CHECK:", process.env.MONGO_URI);

const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/auth",require("./routes/auth"))

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

