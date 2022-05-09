const User = require("../models/users")
const Post = require("../models/posts")
const Comment = require("../models/comments")

const PostsController = {
  Index: (req, res) => { 
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      

      res.render("posts/index", { posts: posts.reverse(), name: posts.name, meal: posts.bookmark });
    });
  },
  New: (req, res) => { 
    let user = req.session.user._id
    let name = req.session.user.name
    let meal = req.params.meal
    let message = req.body.message
    const newPost = new Post({name: name, bookmark: meal, message: message})
    newPost.save((err) => {
      if (err) {
        throw err;
      }
    res.status(201).redirect("/")
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
      res.status(201).redirect("/posts/index")
  }
}
     
module.exports = PostsController;