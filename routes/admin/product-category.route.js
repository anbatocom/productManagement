const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

const controller = require("../../controllers/admin/product-category.controller")

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create', 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  controller.createPOST)

router.get('/edit/:id', controller.edit)

router.patch('/edit/:id', 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  controller.editPATCH
)


module.exports = router;