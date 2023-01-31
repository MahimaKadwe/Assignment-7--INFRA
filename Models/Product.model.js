const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    required: false
  }
});

const Product = mongoose.model('startup_log', ProductSchema);
module.exports = Product;