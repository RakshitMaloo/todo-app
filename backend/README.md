# Todo App - Backend API

Backend API for the Todo Application built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication (Register/Login) with JWT
- ✅ Create, Read, Update, Delete (CRUD) operations for Boards
- ✅ CRUD operations for Todos within Boards
- ✅ Protected routes with JWT middleware
- ✅ Input validation and error handling
- ✅ MongoDB database with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── boardController.js  # Board CRUD operations
│   │   └── todoController.js   # Todo CRUD operations
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Board.js            # Board schema
│   │   └── Todo.js             # Todo schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── boardRoutes.js      # Board endpoints
│   │   └── todoRoutes.js       # Todo endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── errorHandler.js     # Error handling
│   └── utils/
│       └── tokenUtils.js       # JWT token helpers
├── .env                        # Environment variables
├── .env.example                # Example env file
├── .gitignore
├── package.json
└── server.js                   # Entry point

```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file**:
   Copy `.env.example` to `.env` and update the values:
   ```
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

3. **Make sure MongoDB is running**:
   - Local: Start MongoDB service
   - Atlas: Get connection string from MongoDB Atlas

4. **Start the server**:
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication

| Method | Endpoint           | Description          | Access  |
|--------|-------------------|----------------------|---------|
| POST   | /api/auth/register | Register new user    | Public  |
| POST   | /api/auth/login    | Login user          | Public  |
| GET    | /api/auth/me       | Get current user    | Private |

### Boards

| Method | Endpoint          | Description          | Access  |
|--------|------------------|----------------------|---------|
| GET    | /api/boards      | Get all user boards  | Private |
| POST   | /api/boards      | Create new board     | Private |
| GET    | /api/boards/:id  | Get single board     | Private |
| PUT    | /api/boards/:id  | Update board         | Private |
| DELETE | /api/boards/:id  | Delete board         | Private |

### Todos

| Method | Endpoint                    | Description              | Access  |
|--------|----------------------------|--------------------------|---------|
| GET    | /api/todos/board/:boardId  | Get all todos in board   | Private |
| POST   | /api/todos                 | Create new todo          | Private |
| GET    | /api/todos/:id             | Get single todo          | Private |
| PUT    | /api/todos/:id             | Update todo              | Private |
| PATCH  | /api/todos/:id/toggle      | Toggle todo completion   | Private |
| DELETE | /api/todos/:id             | Delete todo              | Private |

## Request Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Board

```bash
POST /api/boards
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Work Projects",
  "description": "Projects for work"
}
```

### Create Todo

```bash
POST /api/todos
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Complete API documentation",
  "description": "Write detailed API docs",
  "priority": "high",
  "board": "BOARD_ID_HERE"
}
```

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get the token from the login or register response and include it in subsequent requests.

## Database Schema

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- timestamps: createdAt, updatedAt

### Board
- title: String (required)
- description: String
- user: ObjectId (ref: User)
- timestamps: createdAt, updatedAt

### Todo
- title: String (required)
- description: String
- completed: Boolean (default: false)
- priority: String (low/medium/high)
- dueDate: Date
- board: ObjectId (ref: Board)
- user: ObjectId (ref: User)
- timestamps: createdAt, updatedAt

## Error Handling

The API includes centralized error handling for:
- Validation errors
- Duplicate entries
- Invalid ObjectIds
- Authentication errors
- Server errors

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## Testing with Postman/Thunder Client

1. Import the API endpoints
2. Register a new user
3. Copy the JWT token from the response
4. Add token to Authorization header for protected routes
5. Test CRUD operations

## License

ISC
