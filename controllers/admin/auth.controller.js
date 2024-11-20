const Account = require("../../models/account.model")
const md5 = require('md5');
const systemConfig = require("../../config/system")

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login",{
          pageTitle: "Trang đăng nhập",
      }
  )
}

module.exports.loginPOST = async (req, res) => {
  const {email, password} = req.body;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  })

  
  if(!user){
    req.flash("error", "Tài khoản không tồn tại");
    res.redirect("back");
    return;
  }

  if(user.status != "active") {
    req.flash("error", "Tài khoản đang bị khóa");
    res.redirect("back");
    return;
  
  }
  res.cookie("token", user.token);
  res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}