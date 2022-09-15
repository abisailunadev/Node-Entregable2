const express = require('express');
// Controllers
const {createTask, getAllTasks, getTasks, finishTask, cancelTask} = require('../controllers/tasks.controllers');
// Middleware(s)
const { taskExists } = require('../middlewares/tasks.middlewares');

const tasksRouter = express.Router();

tasksRouter.post('/', createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:taskStatus', getTasks);
tasksRouter.patch('/:taskId', taskExists, finishTask);
tasksRouter.delete('/:taskId', taskExists, cancelTask);

module.exports = {tasksRouter};