const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = mongoose.Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  total: {
    type: Number,
    required: true
  },
  transactionDate: Date,
  completionDate: Date,
  completed: Boolean
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction