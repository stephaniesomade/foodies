const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const mongoose = require('mongoose');
var cookieParser = require("cookie-parser");
var morgan = require("morgan")

app.use(morgan("dev"));

app.use(cookieParser());
 
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});
 
// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

// connect to the database
mongoose.connect('mongodb://127.0.0.1/foodies')
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("Connected to the Database"))

// Parses the response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static('public'))

const HomeRouter = require("./routes/home");
const SessionsRouter = require("./routes/sessions")
const UsersRouter = require("./routes/users")


app.use("/", HomeRouter);
app.use("/sessions", SessionsRouter);
app.use("/users/profile", sessionChecker, UsersRouter)
app.use("/users", UsersRouter);

app.listen(3000, () => console.log("Server is listening on port 3000"))
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;