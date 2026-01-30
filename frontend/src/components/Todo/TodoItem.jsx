import React from 'react';
import '../../styles/Todo.css';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            onDelete(todo._id);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-checkbox">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id)}
                />
            </div>

            <div className="todo-content" onClick={() => onEdit(todo)}>
                <h4 className={todo.completed ? 'todo-title-completed' : ''}>
                    {todo.title}
                </h4>
                {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                )}
                <div className="todo-meta">
                    <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                        {todo.priority || 'medium'}
                    </span>
                    {todo.dueDate && (
                        <span className="todo-due-date">
                            📅 {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>

            <div className="todo-actions">
                <button 
                    onClick={() => onEdit(todo)} 
                    className="btn-icon"
                    title="Edit todo"
                >
                    ✏️
                </button>
                <button 
                    onClick={handleDelete} 
                    className="btn-icon btn-delete"
                    title="Delete todo"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
