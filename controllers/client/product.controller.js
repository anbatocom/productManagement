const ProductCategory = require('../../models/product-category.model');
const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
  const products = await Product
    .find({
      status: "active",
      deleted: false
    })
    .sort({
      position: "desc"
    })

  for (const item of products) {
    item.priceNew = item.price * (100 - item.discountPercentage) / 100;
    item.priceNew = item.priceNew.toFixed(0);
  }

  res.render('client/pages/products/index.pug', {
    pageTitle: "Trang DSSP",
    products: products
  })
}

module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  const product = await Product.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  })

  if (product.category_id) {
    const category = await ProductCategory.findOne({
      _id: product.category_id,
      deleted: false,
      status: "active"
    })

    product.category = category; // gán thêm một key category có giá trị là object category vừa tìm được vào product
  }

  product.priceNew = product.price * (100 - product.discountPercentage) / 100;
  product.priceNew = product.priceNew.toFixed(0);

  res.render('client/pages/products/detail.pug', {
    pageTitle: product.title,
    product: product,
  })
}

module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;

  const categoryData = await ProductCategory.findOne({
    slug: slugCategory,
    deleted: false,
    status: "active"
  })

  const allCategoryChildren = [];

  const getCategoryChildren = async (parentID) => {
    const children = await ProductCategory.find({
      parent_id: parentID,
      status: "active",
      deleted: false,
    });

    for (const child of children) {
      allCategoryChildren.push(child.id);

      await getCategoryChildren(child.id)
    }
  };

  await getCategoryChildren(categoryData.id);
  // dùng await để chờ cho hàm thực hiện xong rồi mới chạy tiếp xuống dưới

  console.log(allCategoryChildren);

  const products = await Product.find({
    category_id: { $in: [categoryData.id, ...allCategoryChildren] },
    deleted: false,
    status: "active",
  }).sort({
    position: "desc"
  })

  for (const product of products) {
    product.priceNew = product.price * (100 - product.discountPercentage) / 100;
    product.priceNew = product.priceNew.toFixed(0);
  }

  res.render('client/pages/products/index', {
    pageTitle: categoryData.title,
    products: products,
  })

}

module.exports.search = async (req, res) => {
  const keyword = req.query.keyword

  let products = [];


  if (keyword) {
    const regex = new RegExp(keyword, "i")

    products = await Product
      .find({
        title: regex,
        deleted: false,
        status: "active"
      })
      .sort({
        position: "desc"
      })

      for(const item of products) {
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = item.priceNew.toFixed(0);
      }
  }

  res.render('client/pages/products/search.pug', {
    pageTitle: `Kết quả tìm kiếm: ${keyword}`,
    keyword: keyword,
    products: products,
  })
}