const express = require("express");
const app = express();
const path = require("path");
// const session = require("express-session");
// const mongoose = require('mongoose');


// Parses the response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static('public'))

const HomeRouter = require("./routes/home");


app.use("/", HomeRouter);

app.listen(3000, () => console.log("Server is listening on port 3000"))
