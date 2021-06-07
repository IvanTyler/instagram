const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('Post', postSchema)
