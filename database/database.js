const { Pool } = require("pg")
require("dotenv").config()

/* ***********************
 * Connection Pool
 * *********************** */
let pool
if (process.env.NODE_ENV == "development") {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true, // Render recommends this for production
    })
}

// Added error handling for the pool
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle database client', err)
})

module.exports = {
    async query(text, params) {
        try {
            const res = await pool.query(text, params)
            return res
        } catch (error) {
            console.error("Database Query Error:", error.message)
            throw error
        }
    },
}
