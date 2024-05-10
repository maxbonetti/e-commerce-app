# e-commerce-app

## Description
This project serves as the backend for an e-commerce site, utilizing Express.js and Sequelize to interact with a MySQL database. It handles CRUD operations for products, categories, and tags, making it a flexible solution for managing an e-commerce platform's inventory.

## Installation
To get started with this project, clone the repository and install the dependencies.

`bash
# Clone the repository
git clone https://your-repository-link-here

# Install dependencies
npm install
Configuration
Before running the application, configure the database settings in your .env file according to your local or hosted MySQL database.

## Running the Application
### To start the server, you can use the following npm script:

bash
Copy code
npm start
## For development, you can use:

bash
Copy code
npm run watch
This will start the server with nodemon, allowing it to restart automatically on file changes.

## Seeding the Database
To seed the database with initial data, run the following command:

bash
Copy code
npm run seed
API Routes
Products
GET /api/products - Retrieves all products, including their categories and associated tags.
GET /api/products/:id - Retrieves a single product by ID.
POST /api/products - Creates a new product.
PUT /api/products/:id - Updates a product by ID.
DELETE /api/products/:id - Deletes a product by ID.
Categories
GET /api/categories - Retrieves all categories with their associated products.
GET /api/categories/:id - Retrieves a single category by ID.
POST /api/categories - Creates a new category.
PUT /api/categories/:id - Updates a category by ID.
DELETE /api/categories/:id - Deletes a category by ID.
Tags
GET /api/tags - Retrieves all tags, including their associated products.
GET /api/tags/:id - Retrieves a single tag by ID.
POST /api/tags - Creates a new tag.
PUT /api/tags/:id - Updates a tag by ID.
DELETE /api/tags/:id - Deletes a tag by ID.
# License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# Contributors

Max Bonetti
EdX Coding Bootcamp

# Acknowledgments
Hat tip to anyone whose code was used
Inspiration

# Links
video submission - https://drive.google.com/file/d/1gUH7cz0L9HhYHi-livU_azzhL7bAo6Fc/view
GitHub - https://github.com/maxbonetti
Repo's - https://github.com/maxbonetti?tab=repositories