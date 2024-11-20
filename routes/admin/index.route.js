const dashboardRoute = require("./dashboard.route")
const productRoute = require("./product.route")
const productCategoryRoute = require("./product-category.route.js")
const systemConfig = require("../../config/system.js")
const roleRouter = require("./role.route")
const accountRouter = require("./account.route")
const authRouter = require("./auth.route")
const settingRouter = require("./setting.route")

const authMiddleware = require("../../middlewares/admin/auth.middleware.js")

module.exports.index = (app) => {

  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use(`${PATH_ADMIN}/dashboard`,authMiddleware.requireAuth, dashboardRoute)
  app.use(`${PATH_ADMIN}/products`,authMiddleware.requireAuth, productRoute)
  app.use(`${PATH_ADMIN}/product-category`,authMiddleware.requireAuth, productCategoryRoute)
  app.use(`${PATH_ADMIN}/roles`,authMiddleware.requireAuth, roleRouter)
  app.use(`${PATH_ADMIN}/accounts`,authMiddleware.requireAuth, accountRouter)
  app.use(`${PATH_ADMIN}/settings`,authMiddleware.requireAuth, settingRouter)
  app.use(`${PATH_ADMIN}/auth`, authRouter)
}