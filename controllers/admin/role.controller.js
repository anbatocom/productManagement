const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/roles/index", {
    pageTitle: "Trang nhóm quyền",
    records: records,
  }
  );
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Trang thêm nhóm quyền",
  })
}

module.exports.createPOST = async (req, res) => {
  const role = new Role(req.body);
  await role.save();

  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
  
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const role = await Role.findOne({
    _id: id,
    deleted: false
  });

  res.render("admin/pages/roles/edit", {
    pageTitle: "Trang chỉnh sửa nhóm quyền",
    role: role,
  })
}

module.exports.editPATCH = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({
    _id: id,
    deleted: false,
  }, req.body);

  req.flash("success","Cập nhật thành công");

  res.redirect("back");
}

module.exports.permissions = async (req, res) => {
  const records = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Trang phân quyền",
    records: records,
  })
}

module.exports.permissionsPATCH = async (req, res) => {
  for (const item of req.body) {
    await Role.updateOne({
      _id: item.id,
      deleted: false,
    },{
      permissions: item.permissions,
    })
  }

  req.flash("success", "Cập nhật thành công");

  res.json({
    code: "success"
  })
  
}
