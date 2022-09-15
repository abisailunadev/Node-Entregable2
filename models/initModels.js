const {User} = require('../models/user.model');
const {Task} = require('../models/task.model');

const initModels = () => {
  User.hasMany(Task, {foreignKey: 'userId'});
  Task.belongsTo(User);
};

module.exports = {initModels};