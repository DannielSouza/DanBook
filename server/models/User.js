const mongoose = require('../db/connection')
const {Schema} = require('mongoose')

const User = mongoose.model('user', new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  followers:{
    type: Array,
    default: []
  },
  image:{
    type: String,
    default: ''
  },
}))

module.exports = User