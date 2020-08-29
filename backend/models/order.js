const mongoose = require('mongoose');
const { stringifyConfiguration } = require('tslint/lib/configuration');

const orderSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  onions: {
    type: Number,
    required: true
  },
  lettuces: {
    type: Number,
    required: true
  },
  cheeses: {
    type: Number,
    required: true
  }

});

module.exports = mongoose.model('Order', orderSchema)
