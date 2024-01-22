const { Schema, model } = require("mongoose");

const SizeSchema = Schema({
  size: Number,
  available: Boolean,
}, { _id: false });

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    imgSource: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: [SizeSchema]
    },
    category: {
        type: String,
        required: true
    },
    unitsSold: { 
      type: Number,
      default: 0,
    },
});

export default model('Product', ProductSchema);