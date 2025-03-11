import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model<ICategory>("categories", CategorySchema);



export default Category;
