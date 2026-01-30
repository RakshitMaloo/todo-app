import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a board title'],
        trim: true,
        maxlength: [100, 'Board title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});


boardSchema.index({ user: 1, createdAt: -1 });

const Board = mongoose.model('Board', boardSchema);

export default Board;
