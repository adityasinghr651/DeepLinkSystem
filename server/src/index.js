require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');

// Import Routes (We will create this next)
const linkRoutes = require('./routes/linkRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (The Security Guards)
app.use(cors()); // Allow Frontend (Port 3000) to talk to Backend
app.use(express.json()); // Allow Backend to understand JSON data

// Route Middleware
// Any request starting with /api/links goes to linkRoutes
app.use('/api/links', linkRoutes);

// Health Check Route (Good for Deployment testing)
app.get('/', (req, res) => {
  res.send('Deep Link Server is Running 🚀');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});