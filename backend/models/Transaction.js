const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productTitle: String,
  productDescription: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  isSold: Boolean,
});

module.exports = mongoose.model('Transaction', transactionSchema);
