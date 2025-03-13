Product & Category Management System

Overview

This is a backend API built with Node.js, Express, TypeScript, and MongoDB for managing products and categories. The system allows users to:

Create, retrieve, and manage categories.

Create, update, and retrieve products.

Automatically generate unique product codes.

Filter products by category and search by name.

Apply discount calculations to product prices.

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Language: JavaScript

Development Tools: Nodemon, Dotenv, Cors

⚙️ Setup & Installation

Clone the Repository

git clone https://github.com/MHS676/product-management-api
cd product-management-api

Install Dependencies

npm install

Create a .env File

touch .env

Add the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the Server

npm run dev  
npm run start  