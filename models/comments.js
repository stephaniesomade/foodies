const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema ({
    userID: {
      type: String
    },
    postID: { 
      type: String
    },
    username: { 
      type: String
    },
    mealName: {
      type: String, 
      required: true
    },
    comments: {
      type: String
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
      immutable: true,
    }, 
  });

  const Comments = mongoose.model("Comments", CommentSchema)
  module.exports = Comments;