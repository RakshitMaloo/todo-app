import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Board.css';

const BoardCard = ({ board, onDelete, onEdit }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/board/${board._id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this board? All todos will be deleted.')) {
            onDelete(board._id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(board);
    };

    return (
        <div className="board-card" onClick={handleClick}>
            <div className="board-card-header">
                <h3>{board.title}</h3>
                <div className="board-card-actions">
                    <button 
                        onClick={handleEdit} 
                        className="btn-icon"
                        title="Edit board"
                    >
                        ✏️
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="btn-icon btn-delete"
                        title="Delete board"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            {board.description && (
                <p className="board-card-description">{board.description}</p>
            )}
            <p className="board-card-date">
                Created: {new Date(board.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default BoardCard;
