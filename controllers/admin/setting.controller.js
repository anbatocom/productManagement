const Setting = require("../../models/setting.model");

module.exports.general = async (req, res) => {
  const setting = await Setting.findOne({});
  console.log(setting);

  res.render("admin/pages/settings/general", {
    pageTitle: "Cài đặt chung",
    setting: setting,
  })
}

module.exports.generalPATCH = async (req, res) => {
  const existRecord = await Setting.findOne({}); // truyền vào {} sẽ mặc định cho ra bản ghi đầu tiên của collection đó
  if(existRecord){
    await Setting.updateOne({
      _id: existRecord.id
    }, req.body)
  } else {
    const record = new Setting(req.body);
  await record.save();
  }
  req.flash("success", "Cập nhật thành công")
  res.redirect("back")
}