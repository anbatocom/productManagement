const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

  const cartID = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartID
  })

  const products = cart.products;
  
  let total = 0;

  for (const item of products) {
    const infoItem = await Product.findOne({
      _id: item.productID,
      deleted: false,
      status: "active"
    })

    item.thumbnail = infoItem.thumbnail
    item.title = infoItem.title
    item.slug = infoItem.slug
    item.priceNew = infoItem.price

    if (infoItem.discountPercentage > 0) {
      item.priceNew = (1 - infoItem.discountPercentage/100) * infoItem.price
      item.priceNew = item.priceNew.toFixed(0)
    }
    item.total = item.priceNew * item.quantity
    total += item.total;
  }
  
  
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    products: products,
    total: total,
  })
}

module.exports.addPOST = async (req, res) => {
  const cartID = req.cookies.cartId

  const cart = await Cart.findOne({
    _id: cartID
  })

  const products = cart.products;

  const existProduct = products.find((item => item.productID == req.params.id))

  if (existProduct) {
    existProduct.quantity = existProduct.quantity + parseInt(req.body.quantity)

  } else {
    const product = {
      productID: req.params.id,
      quantity: parseInt(req.body.quantity)
    }
    products.push(product); // them vao mang products 
  }


  await Cart.updateOne({
    _id: cartID
  }, {
    products: products
  })

  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng")
  res.redirect("back")
}

module.exports.delete = async (req, res) => {
  const cartID = req.cookies.cartId;
  const productId = req.params.id;
  
  const cart = await Cart.findOne({
    _id: cartID
  })

  const products = cart.products.filter(item => item.productID != productId);

  await Cart.updateOne({
    _id: cartID
  }, {
    products: products
  })


  req.flash("success", "Xóa sản phẩm khỏi giỏ hàng thành công")
  res.redirect("back");
}

module.exports.updatePATCH = async (req, res) => {
  const cartID = req.cookies.cartId;

  const product = req.body;

  const cart = await Cart.findOne({
    _id: cartID
  })

  const products = cart.products

  const productUpdate = products.find(item => item.productID == product.productID)

  productUpdate.quantity = parseInt(product.quantity)

  await Cart.updateOne({
    _id: cartID
  }, {
    products: products
  })


  res.json({
    code: "success",
    message: "update thanh cong"
  })
  
}