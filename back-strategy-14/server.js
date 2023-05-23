const express = require("express");
const db = require('./app/models/index.js');
const cors = require('cors');
const userRoutes = require('./app/routes/user.routes.js');
const expressConfig = require('./app/config/express.js');
const userController = require('./app/controllers/userController.js');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

db.sequelize
  .sync()
  .then(() => {
    console.log('Database tables synchronized');
  })
  .catch((err) => {
    console.error('Unable to synchronize database tables:', err);
  });


app.use(expressConfig());
app.use('/api/user', userRoutes);


  // ici vient la requete du onsubmit
app.post('/api/verifyUser', (req, res) => {
  userController.verifyUser(req.body, res);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
