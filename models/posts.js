const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema ({
    userID: {
      type: String
    },
    name: { 
      type: String
    },
    bookmark: {
      type: String, 
      required: true
    }, 
    message:{
      type: String, 
    }, 
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
      immutable: true,
    }, 
    likeCount: { 
      type: Number,
    },
    likes: { 
      type: [String]
    },
    comments: {
      type: [{}]
    }
  });

  const Post = mongoose.model("Posts", PostSchema)
  module.exports = Post;