import express, { Router } from "express";
import { createProduct, updateProduct, getProducts } from "../controllers/product.controller";

const router: Router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/", getProducts);

export default router;
