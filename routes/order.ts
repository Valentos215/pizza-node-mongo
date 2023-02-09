import express from "express";
const router = express.Router();
const controller = require("../controllers/order");

router.post("/", controller.create);

export default router;
