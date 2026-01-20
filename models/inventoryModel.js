const db = require('../database/database');

async function getClassifications() {
    try {
        const result = await db.query(
            'SELECT classification_id, classification_name FROM classification ORDER BY classification_name'
        );
        return result.rows;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
}

async function getInventoryByClassificationId(classification_id) {
    try {
        const result = await db.query(
            `SELECT * FROM inventory WHERE classification_id = $1`,
            [classification_id]
        );
        return result.rows;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
}

async function getInventoryById(inv_id) {
    try {
        const result = await db.query(
            `SELECT * FROM inventory WHERE inv_id = $1`,
            [inv_id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
}

module.exports = {
    getClassifications,
    getInventoryByClassificationId,
    getInventoryById
};
