import express from 'express';
import {
    getTodosByBoard,
    getTodo,
    createTodo,
    updateTodo,
    toggleTodoComplete,
    deleteTodo
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(protect);

router.get('/board/:boardId', getTodosByBoard);
router.post('/', createTodo);

router.route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo);

router.patch('/:id/toggle', toggleTodoComplete);

export default router;
