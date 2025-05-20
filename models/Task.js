// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Una tarea debe tener un título
        trim: true,      // Elimina espacios en blanco al inicio y al final
    },
    completed: {
        type: Boolean,
        default: false, // Por defecto, una tarea no está completada
    },
}, { timestamps: true }); // Añade `createdAt` y `updatedAt` automáticamente

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;