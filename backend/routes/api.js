const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../database'); // Import sql and poolPromise

// Route for handling form submission and inserting data into the database
router.post('/data', async (req, res) => {
  try {
    const { name, email, enteredText } = req.body;

    // Insert data into the database
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('enteredText', sql.VarChar, enteredText)
      .query('INSERT INTO user_input (Name, Email, entered_text) VALUES (@name, @email, @enteredText)');
    
    res.status(200).send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
