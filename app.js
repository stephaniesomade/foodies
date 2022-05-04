const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const mongoose = require('mongoose');


// connect to the database
mongoose.connect('mongodb://localhost:27017/friend-website')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
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