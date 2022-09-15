const {Task} = require('../models/task.model');
const {User} = require('../models/user.model');

const createTask = async (req, res) => {
  try {
    const {userId, title, startDate, limitDate} = req.body;

    const newTask = await Task.create({userId, title, startDate, limitDate});

    res.status(201).json({
      status: 'success',
      data: {newTask}
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']},
      include: [{model: User, attributes: {exclude: ['createdAt', 'updatedAt']}}]
    });

    res.status(200).json({
      status: 'success',
      data: {tasks}
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasks = async (req, res) => {
  try {
    const {taskStatus} = req.params;

    if (taskStatus === 'active' || taskStatus === 'completed' || taskStatus === 'late' || taskStatus === 'cancelled'){
      const tasks = await Task.findAll({
        where: {status: taskStatus},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [{model: User, attributes: {exclude: ['createdAt', 'updatedAt']}}]
      });

      res.status(200).json({
        status: 'success',
        data: {tasks}
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: `"${taskStatus}" status doesn't exists in our server`
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const finishTask = async (req, res) => {
  try {
    const {finishDate} = req.body;
    const {task} = req;

    await task.update({finishDate});

    if (task.finishDate > task.limitDate){
      await task.update({status: 'late'})
    } else if (task.finishDate <= task.limitDate){
      await task.update({status: 'completed'})
    }

    res.status(200).json({
      status: 'success',
      data: {task}
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelTask = async (req, res) => {
  try {
    const {task} = req;

    await task.update({status: 'cancelled'});

    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTasks,
  finishTask,
  cancelTask
};