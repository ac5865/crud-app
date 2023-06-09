const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const path = require("path");

const connectDB = require("./server/database/connection");

//MONGO_URI=mongodb+srv://anushkachoudhary:Ix6JHZ5MXDg5Zk5f@crud-app.okecpo9.mongodb.net/users?retryWrites=true&w=majority
const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//request to body parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/img", express.static(path.resolve(__dirname, "public/img")));
app.use("/js", express.static(path.resolve(__dirname, "public/js")));

//load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
