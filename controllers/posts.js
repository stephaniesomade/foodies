const User = require("../models/users")
const Post = require("../models/posts")

const PostsController = {
  Index: (req, res) => { 
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), name: posts.name, meal: posts.bookmark});
    });
  },
  Comment: (req, res) => { 
    let user = req.session.user._id
    let name = req.session.user.name
    let meal = req.params.meal
    let message = req.body.message
    console.log(user)
    console.log(req.params.meal)
    console.log(req.body.message)

    const newComment = new Post({userID: user, name: name, bookmark: meal, message: message})
    newComment.save((err) => {
      if (err) {
        throw err;
      }
    res.status(201).redirect("/")
   });
  }
}
     
module.exports = PostsController;