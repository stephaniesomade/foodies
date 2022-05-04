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
    res.render("users/profile", {name: req.session.user.name, email: req.session.user.email})
  },
  Name: (req, res) => { 
    const id = req.session.user.id
    User.updateOne({id: id, name: req.body.name}, (err) => { 
      if(err) { 
        throw err;
      }
      if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
      }
      res.redirect("/sessions/new");

    });
  }, 
  Email: (req, res) => { 
    const id = req.session.user.id
    User.updateOne({id: id, email: req.body.email}, (err) => { 
      if(err) { 
        throw err;
      }
      if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
      }
      res.redirect("/sessions/new");

    });
  }
}

module.exports = UsersController;