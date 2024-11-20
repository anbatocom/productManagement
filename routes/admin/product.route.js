const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const validate = require("../..//valitdates/admin/product.validate")

const controller = require("../../controllers/admin/product.controller")

router.get('/', controller.index);

router.patch('/change-status', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/permanently-delete', controller.permanentlyDelete);

router.patch('/temporary-delete', controller.temporaryDelete);

router.patch('/restore', controller.restore);
//////////
router.get('/recycle-bin', controller.recycleBIN);
//////////
router.patch('/change-position', controller.changePosition);

router.get('/create', controller.create);

router.post(
  '/create',
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.createPOST, /* hàm trung gian, cần hàm next() để chạy controller tiếp theo */
  controller.createPOST
);

router.get("/edit/:id", controller.edit) //đường dẫn động

router.patch(
  '/edit/:id',
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.createPOST, /* hàm trung gian, cần hàm next() để chạy controller tiếp theo */
  controller.editPATCH
);

router.get("/detail/:id", controller.detail)


module.exports = router;