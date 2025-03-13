const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);


connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});


module.exports = app;
