const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 


router.post('/create', async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).send(newTask);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).send({ message: 'Error al crear la tarea', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).send({ message: 'Error al obtener las tareas', error: error.message });
    }
});


router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error('Error al buscar la tarea por ID:', error);
        
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'ID de tarea inválido' });
        }
        res.status(500).send({ message: 'Error al buscar la tarea', error: error.message });
    }
});


router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true }, 
            { new: true, runValidators: true } 
        );
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error('Error al marcar la tarea como completada:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'ID de tarea inválido' });
        }
        res.status(500).send({ message: 'Error al actualizar la tarea', error: error.message });
    }
});


router.put('/id/:_id', async (req, res) => {
    try {
        const updates = {};
       
        if (req.body.title !== undefined) {
            updates.title = req.body.title;
        } else {
            return res.status(400).send({ message: 'Solo se permite actualizar el campo "title" en este endpoint.' });
        }

        const task = await Task.findByIdAndUpdate(
            req.params._id,
            updates,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error('Error al actualizar la tarea (solo título):', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'ID de tarea inválido' });
        }
        res.status(500).send({ message: 'Error al actualizar la tarea', error: error.message });
    }
});


router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send({ message: 'Tarea eliminada con éxito', task });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'ID de tarea inválido' });
        }
        res.status(500).send({ message: 'Error al eliminar la tarea', error: error.message });
    }
});

module.exports = router;