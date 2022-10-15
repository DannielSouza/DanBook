const mongoose = require('../db/connection')
const {Schema} = require('mongoose')

const Post = mongoose.model('Post', new Schema({
  content:{
    type: String,
    required: true
  },
  image:{
    type: String,
    default: ''
  },
  likes:{
    type: Array,
    default: []
  },
  comments:{
    type: Array,
    default: []
  },
  user: Object
},{timestamps: true}))

module.exports = Post