import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard } from '../services/boardService';
import { getTodosByBoard, createTodo, updateTodo, toggleTodo, deleteTodo } from '../services/todoService';
import TodoItem from '../components/Todo/TodoItem';
import CreateTodo from '../components/Todo/CreateTodo';
import '../styles/BoardDetail.css';

const BoardDetail = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState(null);
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBoardAndTodos();
    }, [boardId]);

    const fetchBoardAndTodos = async () => {
        try {
            setLoading(true);
            const [boardResponse, todosResponse] = await Promise.all([
                getBoard(boardId),
                getTodosByBoard(boardId)
            ]);
            setBoard(boardResponse.data);
            setTodos(todosResponse.data);
        } catch (err) {
            setError('Failed to fetch board details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTodo = async (todoData) => {
        try {
            if (editingTodo) {
                await updateTodo(editingTodo._id, todoData);
            } else {
                await createTodo({ ...todoData, board: boardId });
            }
            fetchBoardAndTodos();
            setIsModalOpen(false);
            setEditingTodo(null);
        } catch (err) {
            setError('Failed to save todo');
            console.error(err);
        }
    };

    const handleToggleTodo = async (todoId) => {
        try {
            await toggleTodo(todoId);
            fetchBoardAndTodos();
        } catch (err) {
            setError('Failed to toggle todo');
            console.error(err);
        }
    };

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
        setIsModalOpen(true);
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodo(todoId);
            fetchBoardAndTodos();
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTodo(null);
    };

    const getFilteredTodos = () => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (!board) {
        return <div className="error-container">Board not found</div>;
    }

    const filteredTodos = getFilteredTodos();
    const stats = {
        total: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length
    };

    return (
        <div className="board-detail">
            <div className="board-header">
                <button onClick={() => navigate('/dashboard')} className="btn-back">
                    ← Back to Boards
                </button>
                <div className="board-info">
                    <h1>{board.title}</h1>
                    {board.description && <p>{board.description}</p>}
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                    ➕ Add Todo
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="board-stats">
                <div className="stat-item">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.active}</span>
                    <span className="stat-label">Active</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.completed}</span>
                    <span className="stat-label">Completed</span>
                </div>
            </div>

            <div className="filter-tabs">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>

            <div className="todos-container">
                {filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        <h3>No todos yet</h3>
                        <p>Add your first todo to this board!</p>
                    </div>
                ) : (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onEdit={handleEditTodo}
                            onDelete={handleDeleteTodo}
                        />
                    ))
                )}
            </div>

            <CreateTodo
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateTodo}
                editTodo={editingTodo}
            />
        </div>
    );
};

export default BoardDetail;
