const Transaction = require('../models/transaction')
const User = require('../models/user')

var get = function (req, res) {
  Transaction.find({})
  .populate('customer')
  .exec(function (err, trans) {
    res.send(err ? err : trans)
  })
}

var getOne = function (req, res) {
  Transaction.findById(req.params.id)
  .populate('customer')
  .exec(function (err, trans) {
    res.send(err ? err : trans)
  })
}

var create = function (req, res) {
  var newTransaction = new Transaction({
    customer: req.body.costumer,
    total: req.body.total,
    transactionDate: new Date(),
    completed: false
  })

  newTransaction.save((err, trans) => {
    res.send(err ? err : trans)
  })
}

var update = function (req, res) {
  Transaction.findById(req.params.id, (err, trans) => {
    if (err) {
      res.send(err)
    } else {
      trans.customer = req.body.customer || trans.customer
      trans.total = req.body.total || trans.total
      trans.completed = req.body.completed || trans.completed

      trans.save((err, trans) => {
        res.send(err ? err : trans)
      })
    }
  })
}

var completed = function (req, res) {
  Transaction.findById(req.params.id, (err, trans) => {
    if (err) {
      res.send(err)
    } else {
      trans.completed = true
      trans.completionDate = new Date()

      trans.save((err, trans) => {
        res.send(err ? err : trans)
      })
    }
  })
}

var remove = function (req, res) {
  Transaction.findOneAndRemove({ _id: req.params.id}, (err, trans) => {
    if (err) {
      res.send(err)
    } else {
      res.send(trans)
    }
  })
}

module.exports = {
  get, getOne, create, update, completed, remove
}