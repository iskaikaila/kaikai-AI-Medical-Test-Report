const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'MedixAI',
    password: 'Admin123', 
    port: 5432,
  });
  
  

pool.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = pool;

