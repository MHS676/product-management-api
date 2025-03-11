import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    discount: number;
    image: string;
    status: string;
    productCode: string;
    category: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String },
    status: { type: String, enum: ["Stock Out", "In Stock"], required: true },
    productCode: { type: String, unique: true, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
