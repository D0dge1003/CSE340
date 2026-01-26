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

/* *****************************
*   Add new classification
* *************************** */
async function addClassification(classification_name) {
    try {
        const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
        return await db.query(sql, [classification_name])
    } catch (error) {
        return error.message
    }
}

/* *****************************
*   Add new inventory
* *************************** */
async function addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
    try {
        const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        return await db.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getClassifications,
    getInventoryByClassificationId,
    getInventoryById,
    addClassification,
    addInventory
};
