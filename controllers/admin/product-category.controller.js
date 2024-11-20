const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system")

module.exports.index = async (req, res) => {
  const list_category = await ProductCategory.find({
    deleted: false
  });
  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh sách danh mục sản phẩm",
    categoryList: list_category,
  });
}

module.exports.create = async (req, res) => {
  const list_category = await ProductCategory.find({
    deleted: false
  });
  // console.log(list_category);

  res.render("admin/pages/product-category/create", {
    pageTitle: "Thêm danh mục sản phẩm",
    categoryList: list_category,
  });
}

module.exports.createPOST = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countRecord = await ProductCategory.countDocuments();
    req.body.position = countRecord + 1;
  }
  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/product-category/`);
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const list_category = await ProductCategory.find({
    deleted: false
  });

  const category = await ProductCategory.findOne({
    _id: id,
    deleted: false
  })

  // console.log(category);

  res.render(`admin/pages/product-category/edit`, {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    categoryList: list_category,
    category: category,
  });
}

module.exports.editPATCH = async (req, res) => {
  // console.log(req.body);
  
  const id = req.params.id;
  
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    delete req.body.position;
  }
  
  await ProductCategory.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhật thành công");

  res.redirect(`back`);
  // res.send("ok")
}