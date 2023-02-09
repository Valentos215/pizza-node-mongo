import express from "express";
const controller = require("../controllers/pizzas");
const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
