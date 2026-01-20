require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'NOT LOADED');
console.log('First 50 chars:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) : 'N/A');
