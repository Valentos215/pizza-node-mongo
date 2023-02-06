const express = require("express");
const controller = require("../controllers/products");
const router = express.Router();

router.get("/:productType", controller.getAll);
router.post("/:productType", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
