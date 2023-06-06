const express = require("express");

//controllers
const repairController = require("../controllers/repair.controller");

const router = express.Router();

router
  .route("/")
  .get(repairController.findProducts)
  .post(repairController.createProduct);

router
  .route("/:id")
  .get(repairController.findProduct)
  .patch(repairController.updateProduct)
  .delete(repairController.deleteProduct);

module.exports = router;
