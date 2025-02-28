const express = require('express');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 3, 
    max: 100,
    message: 'You have exceeded the 100 requests in 3 minutes limit!',
});

const router = express.Router();
const taskController = require('../controllers/tasks');

// Task Routes
router.post('/tasks', apiLimiter, taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/:id', taskController.getTask);
router.get('/tasks', taskController.getTasks);


module.exports = router;