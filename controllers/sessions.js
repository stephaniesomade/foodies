const User = require("../models/users")

const SessionsController = {
  New: (req, res) => {
     res.render("sessions/new", {});
  },
  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.redirect("/sessions/new");
      } else if (user.password != password) {
        res.redirect("/sessions/new");
      } else {
        req.session.user = user;
        res.redirect("home/index");
      }
    });
  },
  Destroy: (req, res) => {
  // delete/post
  }
}

module.exports = SessionsController;