import Board from '../models/Board.js';
import Todo from '../models/Todo.js';


export const getBoards = async (req, res, next) => {
    try {
        const boards = await Board.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: boards.length,
            data: boards
        });
    } catch (error) {
        next(error);
    }
};


export const getBoard = async (req, res, next) => {
    try {
        const board = await Board.findById(req.params.id);

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

        res.status(200).json({
            success: true,
            data: board
        });
    } catch (error) {
        next(error);
    }
};


export const createBoard = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const board = await Board.create({
            title,
            description,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Board created successfully',
            data: board
        });
    } catch (error) {
        next(error);
    }
};


export const updateBoard = async (req, res, next) => {
    try {
        let board = await Board.findById(req.params.id);

        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board not found'
            });
        }

        
        if (board.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this board'
            });
        }

        board = await Board.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Board updated successfully',
            data: board
        });
    } catch (error) {
        next(error);
    }
};


export const deleteBoard = async (req, res, next) => {
    try {
        const board = await Board.findById(req.params.id);

        if (!board) {
            return res.status(404).json({
                success: false,
                message: 'Board not found'
            });
        }

        
        if (board.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this board'
            });
        }

        
        await Todo.deleteMany({ board: req.params.id });

        
        await Board.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Board and associated todos deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
