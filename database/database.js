const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

module.exports = {
    async query(text, params) {
        try {
            return await pool.query(text, params);
        } catch (error) {
            console.error('Database query error: ' + error.message);
            throw error;
        }
    }
};
