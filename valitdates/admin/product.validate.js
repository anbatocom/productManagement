module.exports.createPOST = async (req, res, next) => {
  console.log("chạy vào đây");
  
  if(!req.body.title){
    req.flash("error", "Tiêu đề không được để trống")
    res.redirect("back");
    return;
  }

  if(req.body.title.length < 5){
    req.flash("error", "Tiêu đề cần có ít nhất 5 kí tự")
    res.redirect("back");
    return;
  }

  next();
}