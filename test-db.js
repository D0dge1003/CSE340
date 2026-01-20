const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✅ Database connection successful!');
        console.log('Current time from database:', result.rows[0]);

        const classifications = await pool.query('SELECT * FROM classification');
        console.log('\n✅ Classifications query successful!');
        console.log('Classifications:', classifications.rows);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testConnection();
