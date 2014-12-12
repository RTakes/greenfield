var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
  user: String,
  customer_id: String,
  endingDigits: Number,
  exp: String,
  // city: String,
  // state: String,
  // zip: String,
});

module.exports = mongoose.model('Card', CardSchema);
