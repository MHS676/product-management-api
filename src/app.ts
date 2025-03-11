import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import productRoutes from "./routes/product.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


connectDB().then(() => {
    const PORT = process.env.PORT || 7001;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {

    process.exit(1); 
});

app.use("/api/products", productRoutes);
