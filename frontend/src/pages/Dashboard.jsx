import React, { useState, useEffect } from 'react';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../services/boardService';
import BoardCard from '../components/Board/BoardCard';
import CreateBoard from '../components/Board/CreateBoard';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBoard, setEditingBoard] = useState(null);

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            setLoading(true);
            const response = await getBoards();
            setBoards(response.data);
        } catch (err) {
            setError('Failed to fetch boards');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBoard = async (boardData) => {
        try {
            if (editingBoard) {
                await updateBoard(editingBoard._id, boardData);
            } else {
                await createBoard(boardData);
            }
            fetchBoards();
            setIsModalOpen(false);
            setEditingBoard(null);
        } catch (err) {
            setError('Failed to save board');
            console.error(err);
        }
    };

    const handleEditBoard = (board) => {
        setEditingBoard(board);
        setIsModalOpen(true);
    };

    const handleDeleteBoard = async (boardId) => {
        try {
            await deleteBoard(boardId);
            fetchBoards();
        } catch (err) {
            setError('Failed to delete board');
            console.error(err);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBoard(null);
    };

    if (loading) {
        return <div className="loading-container">Loading boards...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>My Boards</h1>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="btn-primary"
                >
                    ➕ Create Board
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {boards.length === 0 ? (
                <div className="empty-state">
                    <h3>No boards yet</h3>
                    <p>Create your first board to get started!</p>
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="btn-primary"
                    >
                        Create Board
                    </button>
                </div>
            ) : (
                <div className="boards-grid">
                    {boards.map((board) => (
                        <BoardCard
                            key={board._id}
                            board={board}
                            onDelete={handleDeleteBoard}
                            onEdit={handleEditBoard}
                        />
                    ))}
                </div>
            )}

            <CreateBoard
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateBoard}
                editBoard={editingBoard}
            />
        </div>
    );
};

export default Dashboard;
