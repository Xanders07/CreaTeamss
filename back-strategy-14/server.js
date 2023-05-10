const express = require("express");
const db = require('./app/models/index.js');
const userRoutes = require('./app/routes/user.routes.js');
const expressConfig = require('./app/config/express.js');

const app = express()
const port = process.env.PORT || 5000;

db.sequelize
  .sync()
  .then(() => {
    console.log('Database tables synchronized');
  })
  .catch((err) => {
    console.error('Unable to synchronize database tables:', err);
  });

// Set up middleware and routes
app.use(expressConfig());
app.use('/api/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
