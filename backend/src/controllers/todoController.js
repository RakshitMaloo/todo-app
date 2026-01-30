import Todo from '../models/Todo.js';
import Board from '../models/Board.js';


export const getTodosByBoard = async (req, res, next) => {
    try {
       
        const board = await Board.findById(req.params.boardId);

        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board not found'
            });
        }

        if (board.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this board'
            });
        }

        const todos = await Todo.find({ board: req.params.boardId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error) {
        next(error);
    }
};


export const getTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

       
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this todo'
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        next(error);
    }
};


export const createTodo = async (req, res, next) => {
    try {
        const { title, description, priority, dueDate, board } = req.body;

       
        const boardExists = await Board.findById(board);

        if (!boardExists) {
            return res.status(404).json({
                success: false,
                message: 'Board not found'
            });
        }

        if (boardExists.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to add todos to this board'
            });
        }

        const todo = await Todo.create({
            title,
            description,
            priority,
            dueDate,
            board,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: todo
        });
    } catch (error) {
        next(error);
    }
};


export const updateTodo = async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this todo'
            });
        }

        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: todo
        });
    } catch (error) {
        next(error);
    }
};


export const toggleTodoComplete = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this todo'
            });
        }

        todo.completed = !todo.completed;
        await todo.save();

        res.status(200).json({
            success: true,
            message: 'Todo completion toggled successfully',
            data: todo
        });
    } catch (error) {
        next(error);
    }
};


export const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        
        if (todo.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this todo'
            });
        }

        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
