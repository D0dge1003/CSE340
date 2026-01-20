const { Pool } = require('pg');
require('dotenv').config();

console.log('Attempting to connect to database...');
console.log('Database URL protocol:', process.env.DATABASE_URL?.split(':')[0]);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log('Connecting to pool...');
        const client = await pool.connect();
        console.log('✅ Pool connection successful!');

        const result = await client.query('SELECT NOW()');
        console.log('Current time from database:', result.rows[0]);

        const classifications = await client.query('SELECT * FROM classification');
        console.log('✅ Classifications query successful! Count:', classifications.rows.length);

        client.release();
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed!');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        if (error.detail) console.error('Error Detail:', error.detail);
        if (error.stack) console.error('Stack Trace:', error.stack);
        process.exit(1);
    }
}

testConnection();
