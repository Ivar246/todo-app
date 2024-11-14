# Todo App Server

This is the backend server for a Todo application, built with [NestJS](https://nestjs.com/) and designed to provide a robust API for managing todo items. The server includes CRUD (Create, Read, Update, Delete) operations for todos, user management, and search functionality.

## Table of Contents

- [Features](#features)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication** - Register and authenticate users with JWT
- **CRUD Operations** - Create, read, update, and delete todo items
- **File Upload** - Upload file related to todo
- **Search Functionality** - Search todos by title or description
- **Validation & Error Handling** - Data validation and structured error responses
- **Modular Structure** - Organized codebase following NestJS best practices

### Authentication

- **POST** `/ap/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate a user and return a JWT token

### Users

- **GET** `/api/users` - Get a list of all users (only admin)
- **GET** `/api/users/:id` - Get details of a specific user by ID (user owner and admin)
- **PUT** `/api/users/:id` - Update user information (owner or admin)
- **DELETE** `/api/users/:id` - Delete a user

### Todos

- **POST** `/api/todos` - Create a new todo item (admin and authenticated user)
- **GET** `/api/todos` - Get a list of all todo items (everyone)
- **GET** `/api/todos/:id` - Get details of a specific todo item by ID ()
- **PUT** `/api/todos/:id` - Update a specific todo item (owner and admin)
- **DELETE** `/api/todos/:id` - Delete a specific todo item (owner and admin)

### Search

- **GET** `/api/todos/search?q=<searchTerm>` - Search for todos by title or description

Each endpoint requires appropriate authentication (JWT token in the headers for protected routes) and may include validation for incoming data. Detailed request and response schemas are available via Swagger.

## Getting Started

Follow these instructions to set up the backend server on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) or other compatible database

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ivar246/todo-app
   cd todo-app/server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variable:**

   ````bash
   DATABASE_URL=postgres://user:password@localhost:5432/todoapp
   JWT_SECRET=your_jwt_secret   ```

   ````

4. **Setup Database:**

   Run the following command to initialize Prisma and apply any migrations:

   ```bash
   npx prisma migrate dev
   ```

## Technologies Used

This project utilizes the following technologies:

- **NestJS**  
  A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. NestJS is used as the main framework for building the Todo app's backend API.

- **TypeScript**  
  A strict syntactical superset of JavaScript that adds optional static typing. TypeScript provides type safety and better tooling support, making the development process smoother.

- **Prisma**  
  A next-generation Object-Relational Mapper (ORM) for Node.js and TypeScript, used for database access. Prisma helps manage the database schema and queries efficiently.

- **PostgreSQL**  
  A powerful, open-source object-relational database system. PostgreSQL is used to store user and todo data in this app.

- **JWT (JSON Web Tokens)**  
  A compact, URL-safe means of representing claims to be transferred between two parties. JWT is used for user authentication and authorization.

- **Argon2**  
  A password-hashing function for securely storing user passwords. Argon2 is used to hash and compare passwords during user authentication.

- **class-validator**  
  A validation library for JavaScript and TypeScript, used for validating incoming data in DTOs (Data Transfer Objects).

- **class-transformer**  
  A library for transforming plain objects into class instances and vice versa. It's used to ensure the correct shape and structure of incoming data.

- **Passport.js**  
  A popular authentication middleware for Node.js, used to authenticate requests using various strategies (like JWT). Passport is used to handle authentication processes, including login and user sessions.

Each of these technologies plays a crucial role in the functionality, scalability, and security of the Todo app's backend.
