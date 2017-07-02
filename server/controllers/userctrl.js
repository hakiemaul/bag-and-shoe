require('dotenv').config()
const sec = process.env.TOKEN_SECRET
const saltRounds = Number(process.env.SALT_ROUNDS)

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var get = function (req, res) {
  User.find({}, function (err, users) {
    res.send(err ? err : users)
  })
}

var signup = function (req, res) {
  var salt = bcrypt.genSaltSync(saltRounds)
  var hash = bcrypt.hashSync(req.body.password, salt)

  var newUser = new User({
    username: req.body.username,
    phone: req.body.phone,
    password: hash
  })
  newUser.save((err, user) => {
    res.send(err ? err : user)
  })
}

var update = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err)
    } else {
      user.username = req.body.username || user.username
      user.phone = req.body.phone || user.phone
      if (req.body.password) {
        var salt = bcrypt.genSaltSync(saltRounds)
        var hash = bcrypt.hashSync(req.body.password, salt)
        user.password = hash
      }

      user.save((err, user) => {
        res.send(err ? err : article)
      })
    }
  })
}

var remove = function (req, res) {
  User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
    res.send(err ? err : user)
  })
}

var login = function (req, res) {
  var username = req.body.username
  var password = req.body.password

  User.findOne({ username: username }, function (err, user) {
    if (err) {
      res.send(err)
    } else {
      if (user) {
        bcrypt.compare(password, user.password)
        .then(result => {
          if (result) {
            var token = jwt.sign({ _id: user._id, username: user.username, email: user.email}, sec)
            res.send({ token: token })
          } else {
            res.send({ msg: 'Incorrect password' })
          }
        })
      } else res.send({ msg: 'User not found' })
    }
  })
}

var userData = function (req, res) {
  let token = req.body.token
  if (token) {
    jwt.verify(token, sec, (err, decoded) => {
      res.send(decoded)
    })
  } else res.send({ msg: 'Not logged in' })
}

var authUser = function (req, res, next) {
  let token = req.body.token
  if (token) {
    jwt.verify(token, sec, (err, decoded) => {
      if (!err) {
        req.body.customer = decoded._id
        next()
      } else res.send(err)
    })
  } else res.send({ msg: 'Not logged in' })
}

module.exports = {
  get, signup, update, remove, login, userData, authUser
}