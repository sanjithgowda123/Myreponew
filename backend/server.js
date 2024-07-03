const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const sql = require('mssql');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 4000; // Use environment port if available

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: false,
  },
  port: parseInt(process.env.DB_PORT, 10),
};

// Connect to database
sql.connect(config)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api', apiRoutes);

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
