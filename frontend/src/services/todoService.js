import API from './api';

// Get todos by board
export const getTodosByBoard = async (boardId) => {
    const response = await API.get(`/todos/board/${boardId}`);
    return response.data;
};

// Get single todo
export const getTodo = async (id) => {
    const response = await API.get(`/todos/${id}`);
    return response.data;
};

// Create new todo
export const createTodo = async (todoData) => {
    const response = await API.post('/todos', todoData);
    return response.data;
};

// Update todo
export const updateTodo = async (id, todoData) => {
    const response = await API.put(`/todos/${id}`, todoData);
    return response.data;
};

// Toggle todo completion
export const toggleTodo = async (id) => {
    const response = await API.patch(`/todos/${id}/toggle`);
    return response.data;
};

// Delete todo
export const deleteTodo = async (id) => {
    const response = await API.delete(`/todos/${id}`);
    return response.data;
};
