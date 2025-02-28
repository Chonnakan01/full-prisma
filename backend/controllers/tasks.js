const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new task
const createTask = async (req, res) => {
    const { title, description, status, due_date } = req.body;
    try {
        const task = await prisma.task.create({
            data: { title, description, status, due_date }
        });
        res.status(201).json({
            status: 'ok',
            message: `Task with id ${task.id} is created successfully`,
            task
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            error: err.message
        });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Error retrieving tasks', 
            error: err.message 
        });
    }
};

// Get a single task by ID
const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id: Number(id) }
        });
        if (!task) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Error retrieving task', 
            error: err.message 
        });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    const { title, description, status, due_date } = req.body;
    const { id } = req.params;
    const data = {};

    if (title) data.title = title;
    if (description) data.description = description;
    if (status) data.status = status;
    if (due_date) data.due_date = due_date;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ status: 'error', message: 'No data to update' });
    }

    try {
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data
        });
        res.status(200).json({
            status: 'ok',
            message: `Task with id ${task.id} is updated successfully`,
            task
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ status: 'error', message: `Task with id ${id} not found` });
        }
        res.status(500).json({ 
            status: 'error', 
            message: 'Error while updating the task', 
            error: err.message 
        });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const existingTask = await prisma.task.findUnique({
            where: { id: Number(id) }
        });
        if (!existingTask) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }
        await prisma.task.delete({ where: { id: Number(id) } });
        res.status(200).json({
            status: 'ok',
            message: `Task with id ${id} is deleted successfully`
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Error deleting task', 
            error: err.message 
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
};
