import React, { useState, useEffect } from 'react';
import '../../styles/Modal.css';

const CreateBoard = ({ isOpen, onClose, onSubmit, editBoard }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        if (editBoard) {
            setFormData({
                title: editBoard.title || '',
                description: editBoard.description || ''
            });
        } else {
            setFormData({ title: '', description: '' });
        }
    }, [editBoard, isOpen]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', description: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editBoard ? 'Edit Board' : 'Create New Board'}</h2>
                    <button onClick={onClose} className="modal-close">×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Board Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter board title"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter board description (optional)"
                            rows="3"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            {editBoard ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBoard;
