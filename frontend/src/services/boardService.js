import API from './api';

// Get all boards
export const getBoards = async () => {
    const response = await API.get('/boards');
    return response.data;
};

// Get single board
export const getBoard = async (id) => {
    const response = await API.get(`/boards/${id}`);
    return response.data;
};

// Create new board
export const createBoard = async (boardData) => {
    const response = await API.post('/boards', boardData);
    return response.data;
};

// Update board
export const updateBoard = async (id, boardData) => {
    const response = await API.put(`/boards/${id}`, boardData);
    return response.data;
};

// Delete board
export const deleteBoard = async (id) => {
    const response = await API.delete(`/boards/${id}`);
    return response.data;
};
