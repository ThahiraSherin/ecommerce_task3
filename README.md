# E-Commerce Backend

A simple **Node.js + Express + MySQL** backend for an e-commerce platform.  
Supports: user authentication, product listing, order placement, and order tracking.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Database Setup](#database-setup)  
- [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
- [Testing with Postman](#testing-with-postman)  
- [License](#license)  

---

## Features

- User registration & login (JWT authentication)  
- View products  
- Place orders with multiple items  
- Protected routes for orders (only logged-in users)  
- Order history for each user  

---

## Tech Stack

- Node.js  
- Express.js  
- MySQL / MariaDB  
- JWT for authentication  
- bcrypt for password hashing  
- nodemon for development  

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd e-commerce

2. Install dependencies:
npm install

3. Make sure XAMPP/MySQL is running.
4. Configure the database connection in config/db.js:
    const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // your MySQL password
    database: "ecommerce"
    });


Database Setup

1. Open phpMyAdmin or MySQL console.
2. Create the database:
    CREATE DATABASE ecommerce;
    USE ecommerce;
3. Create tables:
    -- Users table
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
    );

    -- Products table
    CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2)
    );

    -- Orders table
    CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Pending',
    payment_method VARCHAR(50) DEFAULT 'Cash on Delivery',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Order Details table
    CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    );

4. Insert sample products:
    INSERT INTO products (name, price) VALUES
    ('iPhone 14', 1200.00),
    ('Samsung Galaxy S23', 1100.00),
    ('AirPods Pro', 250.00);

Running the Server
    npx nodemon server.js

Server will start on http://localhost:3000

You should see:

    Server running on port 3000
    Connected to MySQL database!

API Endpoints
Authentication
Method	URL	Body	Description
POST	/api/auth/register	{ "name": "", "email": "", "password": "" }	Register a new user

POST	/api/auth/login	{ "email": "", "password": "" }	Login and get JWT token

Products
Method	URL	Description
GET	/api/products	Get all products


Orders (Protected)

Add header: Authorization: Bearer <JWT_TOKEN>

Method	URL	Body	Description
POST	/api/orders	{ "items": [{ "product_id": 1, "quantity": 1, "price": 1200 }] }	Place an order
GET	/api/orders	-	Get all orders for logged-in user


Testing with Postman
1. Register a new user → POST /api/auth/register
2. Login → POST /api/auth/login → copy the JWT token
3. Get Products → GET /api/products
4. Place Order → POST /api/orders (add JWT token in Authorization header)
5. Get Orders → GET /api/orders (with JWT token)

Headers for protected routes:

Key: Content-Type     Value: application/json
Key: Authorization    Value: Bearer <JWT_TOKEN>

Body for placing order (raw JSON):

{
  "items": [
    { "product_id": 1, "quantity": 1, "price": 1200.00 },
    { "product_id": 3, "quantity": 2, "price": 250.00 }
  ]
}
License

This project is licensed under the MIT License.


---