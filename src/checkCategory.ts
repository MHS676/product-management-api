import connectDB from "./config/db";
import Category from "./models/category.model";

const checkCategoryExists = async () => {
    try {

        await connectDB();

        const categoryId = "65f1234567abcd890ef12345"; 
        const category = await Category.findById(categoryId);

        if (!category) {
            console.log("Category not found!");
        } else {
            console.log("Category exists:", category);
        }
    } catch (error) {
        console.error("Error checking category:", error);
    }

};