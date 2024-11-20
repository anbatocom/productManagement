const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
  {
    products: Array,
    // save the product id and the quantity of that product
    expireAt: {
      type: Date,
      expires: 0
    } 
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart',cartSchema,'carts' //tên Collection muốn trỏ vào
);

module.exports = Cart;
