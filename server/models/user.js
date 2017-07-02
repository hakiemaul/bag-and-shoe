const mongoose = require('mongoose')
const validator = require('validator')

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  phone: {
    type: String,
    required: true,
    minlength: 8
  },
  password: {
    type: String,
    required: true
  }
})

var User = mongoose.model('User', userSchema)

module.exports = User