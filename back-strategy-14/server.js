const express = require("express");

const expressConfig = require('./app/config/express');
const userRoutes = require('./app/routes/user.routes');
const db = require('./app/models');

const app = express();
const port = process.env.PORT || 5000;

db.sequelize
  .sync({ force: true })
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