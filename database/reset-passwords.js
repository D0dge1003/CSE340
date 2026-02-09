/* ******************************************
 *  Reset Passwords Script
 * ****************************************** */
const pool = require("./database")
const bcrypt = require("bcryptjs")

async function resetPasswords() {
    console.log("Starting password reset...")
    const accounts = [
        { email: "basic@340.edu", password: "P@ssword123", firstname: "Basic", lastname: "Client", type: "Client" },
        { email: "happy@340.edu", password: "P@ssword123", firstname: "Happy", lastname: "Employee", type: "Employee" },
        { email: "manager@340.edu", password: "P@ssword123", firstname: "Manager", lastname: "User", type: "Admin" }
    ]

    try {
        for (const account of accounts) {
            const hashedPassword = await bcrypt.hashSync(account.password, 10)

            // Check if account exists
            const checkSql = "SELECT * FROM account WHERE account_email = $1"
            const checkResult = await pool.query(checkSql, [account.email])

            if (checkResult.rowCount > 0) {
                // Update existing
                const updateSql = "UPDATE account SET account_password = $1 WHERE account_email = $2"
                await pool.query(updateSql, [hashedPassword, account.email])
                console.log(`Updated password for ${account.email}`)
            } else {
                // Insert new
                const insertSql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, $5)"
                await pool.query(insertSql, [account.firstname, account.lastname, account.email, hashedPassword, account.type])
                console.log(`Created account for ${account.email}`)
            }
        }
        console.log("Password reset complete.")
    } catch (error) {
        console.error("Error resetting passwords:", error)
    } finally {
        // We can't easily close the pool if it's exported as a module instance, but in a script we generally want to exit.
        // The pool from './database' might keep the process alive.
        process.exit()
    }
}

resetPasswords()
