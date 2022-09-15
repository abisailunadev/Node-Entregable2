const {app} = require('./app');
// Utils
const {db} = require('./utils/database.util');
const {initModels} = require('./models/initModels');

const startServer = async () => {
  try {
    await db.authenticate();
    initModels();
    await db.sync();

    const PORT = '4501';
    app.listen(PORT, () => {
      console.log('Express App running!')
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();