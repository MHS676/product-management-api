const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created successfully!", category });
  } catch (error) {
    res.status(400).json({ message: "Failed to create category", error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};
