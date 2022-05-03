const express = require("express");
// const session = require("express-session");
// const mongoose = require('mongoose');
const app = express();
const path = require("path");


// Parses the response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const HomeRouter = require("./routes/home");

app.use("/", HomeRouter);

app.listen(3000, () => console.log("Server is listening on port 3000"))
