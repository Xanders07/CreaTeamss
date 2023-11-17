const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./app/routes/user.routes.js');

// Middleware cookie-parser
app.use(cookieParser());

app.use(express.json());

// Configuration CORS
app.use(cors({ 
  origin: 'http://localhost:4200',
  credentials: true // Autoriser les cookies CORS
}));

// Routes utilisateur
app.use('/api/user', userRoutes); // Utilise les routes définies pour les utilisateurs

// ... autres configurations et middlewares

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
