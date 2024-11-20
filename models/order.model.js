const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    // userId: String,
    products: Array,
    fullName: String,
    phone: String,
    address: String,
    // save the product id and the quantity of that product
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order',orderSchema,'orders' //tên Collection muốn trỏ vào
);

module.exports = Order;
