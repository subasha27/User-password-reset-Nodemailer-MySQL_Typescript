const express = require('express');
const bodyParser = require('body-parser');
const route = require('./Router/routes'); // Assuming the route file is named 'routes.js'
const sequelize = require("./utils/db");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', route);

sequelize.sync();

const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
