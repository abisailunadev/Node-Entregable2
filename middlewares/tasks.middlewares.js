const {Task} = require('../models/task.model');

const taskExists = async (req, res, next) => {
  try {
    const {taskId} = req.params;

    const task = await Task.findOne({where: {id: taskId}});
    if (!task){
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    } else if (task.status === 'completed' || task.status === 'late' || task.status === 'cancelled'){
      return res.status(404).json({
        status: 'error',
        message: `This task was already completed with status: ${task.status}! :)`
      });
    }

    req.task = task;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {taskExists};