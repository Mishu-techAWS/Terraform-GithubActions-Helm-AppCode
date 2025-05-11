const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Initialize database
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        votes INTEGER DEFAULT 0
      )
    `);
    
    // Insert initial candidates if table is empty
    const result = await pool.query('SELECT COUNT(*) FROM candidates');
    if (result.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO candidates (name, votes) VALUES
        ('Candidate 1', 0),
        ('Candidate 2', 0),
        ('Candidate 3', 0)
      `);
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Routes
app.get('/api/candidates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidates');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/vote', async (req, res) => {
  const { candidateId } = req.body;
  try {
    await pool.query(
      'UPDATE candidates SET votes = votes + 1 WHERE id = $1',
      [candidateId]
    );
    res.json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize database and start server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}); 