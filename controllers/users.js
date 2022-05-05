const { redirect } = require("express/lib/response");
const User = require("../models/users")

const UsersController = { 
  New: (req, res) => { 
    res.render("users/new")
  },
  Create: (req, res) => {
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
    const id = req.session.user._id
    const newName = req.body.name
    User.updateOne({id: id, name: newName}, (err) => { 
      if (err) {
        throw err
      }
      res.status(201).redirect("/sessions/new");
      })
    }, 
  Email: (req, res) => { 
    const id = req.session.user._id
    const email = req.body.email
    User.updateOne({id: id, email: email}, (err) => { 
      if(err) { 
        throw err;
      }
      res.status(201).redirect("/sessions/new");
    });
  },
  Bookmarks: (req, res) => {
    const id = req.session.user._id
    const meal = req.params.id
    User.updateOne({id: id, $push: {bookmarks: meal}}, (err) => { 
      if (err) { 
        throw err
      }
      res.status(201).redirect("/");
    })
    // Save it to the bookmarks 
  }
}

module.exports = UsersController;