const User = require("../models/users")
const Post = require("../models/posts")

const PostsController = {
  Index: (req, res) => { 
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", {title: "Forum page" , user: req.session.user, posts: posts.reverse(), name: posts.name, meal: posts.bookmark, time: posts.createdAt, date: posts.Date});
    });
  },
  New: (req, res) => { 
    let name = req.session.user.name
    let meal = req.params.meal
    let message = req.body.message
    const date = new Date
    const arr = date.toString().split(" ");
    let formattedDate = arr[2] + " " + arr[1]+ " " + arr[4]
    // Formatted Date as opposed to Mongoose's ugly Date format
    const newPost = new Post({name: name, bookmark: meal, message: message, Date: formattedDate})
    newPost.save((err) => {
      if (err) {
        throw err;
      }
    res.status(201).redirect("/users/profile")
   });
  },
  Comment: async (req, res) => {
    const postID = req.params.postid
    const message = req.body.comment
    const userID = req.session.user._id
    const username = req.session.user.name
    const meal = req.params.meal
    console.log(req.params.meal)
    const name = await Post.findOneAndUpdate({_id: postID}, { $push: { comments: { "username": username, "comments": message}}})
    res.redirect("/posts")
  },
  View: (req, res) => {
    const name = req.params.name
    const newName = name.replace(/ /g,"_")
    console.log(newName)
    res.render("posts/recipe", {meal: newName})
  }
}
     
module.exports = PostsController;