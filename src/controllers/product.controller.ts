import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import Category from "../models/category.model";
import { generateProductCode } from "../utils/generateProductCode";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, discount, image, status, category } = req.body;

        console.log("Received request to create product:", req.body);


        if (!mongoose.Types.ObjectId.isValid(category)) {

            res.status(400).json({ message: "Invalid category ID format" });
            return;
        }

        console.log("🔍 Validating category with ID:", category);


        const categoryExists = await Category.findById(category);
        if (!categoryExists) {

            res.status(400).json({ message: "Invalid category" });
            return;
        }


        const productCode = generateProductCode(name);


        const product = await Product.create({
            name,
            description,
            price,
            discount,
            image,
            status,
            category,
            productCode,
        });

        res.status(201).json(product);
    } catch (error) {

        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};




export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, search } = req.query;
        let filter: any = {};

        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category as string)) {
                res.status(400).json({ message: "Invalid category ID format" });
                return;
            }
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(filter).populate("category");

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
