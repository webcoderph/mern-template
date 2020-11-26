const mongoose = require('mongoose')

const accountsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0.00
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const Account = mongoose.model("accounts", accountsSchema)
module.exports = Account