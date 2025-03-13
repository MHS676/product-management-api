const Product = require("../models/Product");
const Category = require("../models/Category");
const { generateProductCode } = require("../services/productCodeGenerator");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, image, status, category } = req.body;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }

  
    const productCode = await generateProductCode(name); 

    const finalPrice = price - (price * (discount / 100));

    const product = await Product.create({
      name, description, price, discount, image, status, productCode, category
    });

    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    res.status(400).json({ message: "Failed to create product", error: error.message });
  }
};





exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, discount } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, { status, description, discount }, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filters = {};

    if (category) filters.category = category;
    if (search) filters.name = { $regex: search, $options: "i" };

    const products = await Product.find(filters).populate("category");

    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      finalPrice: product.price - (product.price * product.discount) / 100
    }));

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
