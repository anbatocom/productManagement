const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller")

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create', controller.createPOST)

router.get('/edit/:id', controller.edit)

router.patch('/edit/:id', controller.editPATCH)

router.get('/permissions', controller.permissions)

router.patch('/permissions', controller.permissionsPATCH)

module.exports = router;