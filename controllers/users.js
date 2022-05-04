const User = require("../models/users")

const UsersController = { 
  New: (req, res) => { 
    res.render("users/new")
  },
  Create: (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/");
    });
  }, 
  Profile: (req, res) => { 
    console.log(req.session.user.name)
    res.render("users/profile", {name: req.session.user.name, email: req.session.user.email})
  }
}

module.exports = UsersController;