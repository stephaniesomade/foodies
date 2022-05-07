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

  Profile: async (req, res) => { 
    const id = await User.find({_id: req.session.user._id})
    const array = id[0].bookmarks
    const name = req.session.user.name
    res.render("users/profile", {name: name, email: req.session.user.email, arr: array})
  },
  Name: async (req, res) => { 
    const id = await req.session.user._id
    const newName = await req.body.name
    const query = await User.findOneAndUpdate({_id: id}, {name: newName})
      res.status(201).redirect("/sessions/new");
    }, 
  Email: async (req, res) => { 
    const id = await req.session.user._id
    const email = await req.body.email
    const query = await User.findOneAndUpdate({_id: id}, {email: email})
      res.status(201).redirect("/sessions/new");
  },

  Bookmarks: async (req, res) => {
    const id = await req.session.user._id
    const meal = await req.params.id
    const query = await User.findOneAndUpdate({_id: id}, {$push: {bookmarks: meal}})
      res.status(201).redirect("/");
    // Save it to the bookmarks 
  }
}

module.exports = UsersController;