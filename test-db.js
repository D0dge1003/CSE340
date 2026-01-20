const { Pool } = require('pg');
require('dotenv').config();

const passwords = ['4DOiYeGhsXj68XQ3TvA8LURdycmoh8rU'];
const hosts = [
    'dpg-d5l61am3jp1c7393ggug-a.singapore-postgres.render.com', // lowercase L
    'dpg-d5161am3jp1c7393ggug-a.singapore-postgres.render.com', // number 1
    'dpg-d5dn6h8gjchc73dq5fpg-a.singapore-postgres.render.com'  // from previous error
];

async function tryConnect(host) {
    console.log(`\nTesting host: ${host}`);
    const connectionString = `postgresql://demo345:4DOiYeGhsXj68XQ3TvA8LURdycmoh8rU@${host}/demo345_ud67`;
    const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
    });

    try {
        const client = await pool.connect();
        console.log(`✅ SUCCESS with host: ${host}`);
        const res = await client.query('SELECT NOW()');
        console.log('Time:', res.rows[0]);
        client.release();
        await pool.end();
        return true;
    } catch (err) {
        console.log(`❌ FAILED with host: ${host} - ${err.message}`);
        await pool.end();
        return false;
    }
}

async function run() {
    for (const host of hosts) {
        if (await tryConnect(host)) {
            console.log('\n--- FOUND WORKING HOST ---');
            console.log(`Update your .env to use: ${host}`);
            process.exit(0);
        }
    }
    console.log('\nAll attempts failed.');
    process.exit(1);
}

run();
