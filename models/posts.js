const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema ({
    userID: {
      type: String
    },
    bookmark: {
      type: String, 
      required: true
    }, 
    message:{
      type: String, 
      required: true
    }, 
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
      immutable: true,
    }, 
    comments: { 
      type: [String]
    }
  });

  const Post = mongoose.model("Posts", PostSchema)
  module.exports = Post;