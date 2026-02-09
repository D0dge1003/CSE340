const pool = require("../database/database")

/* *****************************
 *   Add item to wishlist
 * *************************** */
async function addWishlistItem(account_id, inv_id) {
    try {
        const sql = "INSERT INTO wishlist (account_id, inv_id) VALUES ($1, $2) RETURNING *"
        return await pool.query(sql, [account_id, inv_id])
    } catch (error) {
        throw error
    }
}

/* *****************************
 *   Remove item from wishlist
 * *************************** */
async function removeWishlistItem(wishlist_id) {
    try {
        const sql = "DELETE FROM wishlist WHERE wishlist_id = $1 RETURNING *"
        return await pool.query(sql, [wishlist_id])
    } catch (error) {
        throw error
    }
}

/* *****************************
 *   Get wishlist items by account_id
 * *************************** */
async function getWishlistByAccountId(account_id) {
    try {
        const sql = `
            SELECT w.wishlist_id, w.added_at, i.inv_id, i.inv_make, i.inv_model, i.inv_thumbnail, i.inv_price 
            FROM wishlist w 
            JOIN inventory i ON w.inv_id = i.inv_id 
            WHERE w.account_id = $1
            ORDER BY w.added_at DESC`
        const data = await pool.query(sql, [account_id])
        return data.rows
    } catch (error) {
        throw error
    }
}

/* *****************************
 *   Check if item exists in wishlist
 * *************************** */
async function checkExisting(account_id, inv_id) {
    try {
        const sql = "SELECT * FROM wishlist WHERE account_id = $1 AND inv_id = $2"
        const data = await pool.query(sql, [account_id, inv_id])
        return data.rowCount
    } catch (error) {
        throw error
    }
}


module.exports = { addWishlistItem, removeWishlistItem, getWishlistByAccountId, checkExisting }
