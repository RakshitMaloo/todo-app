import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import boardRoutes from './src/routes/boardRoutes.js';
import todoRoutes from './src/routes/todoRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Todo API is running!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            boards: '/api/boards',
            todos: '/api/todos'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        database: 'Connected'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/todos', todoRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});
