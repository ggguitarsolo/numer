const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  index: Number,
  XL: String,
  XR: String,
  Function: String
})



const ProductModel = mongoose.model('product', productSchema)

module.exports = ProductModel