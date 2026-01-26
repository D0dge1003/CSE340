const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Add Classification Data Validation Rules
 * ********************************* */
validate.addClassificationRules = () => {
    return [
        // classification_name is required and must not contain spaces or special characters
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Classification name is required.")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("Classification name cannot contain spaces or special characters."),
    ]
}

/* ******************************
 * Check data and return errors or continue to Add Classification
 * ***************************** */
validate.checkAddClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.buildClassificationList()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

/*  **********************************
 *  Add Inventory Data Validation Rules
 * ********************************* */
validate.addInventoryRules = () => {
    return [
        body("classification_id").trim().isNumeric().withMessage("Classification is required."),
        body("inv_make").trim().isLength({ min: 3 }).withMessage("Make must be at least 3 characters."),
        body("inv_model").trim().isLength({ min: 3 }).withMessage("Model must be at least 3 characters."),
        body("inv_year").trim().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year must be a 4-digit number."),
        body("inv_description").trim().isLength({ min: 1 }).withMessage("Description is required."),
        body("inv_image").trim().isLength({ min: 1 }).withMessage("Image path is required."),
        body("inv_thumbnail").trim().isLength({ min: 1 }).withMessage("Thumbnail path is required."),
        body("inv_price").trim().isNumeric().withMessage("Price must be a number."),
        body("inv_miles").trim().isNumeric().withMessage("Miles must be a number."),
        body("inv_color").trim().isLength({ min: 1 }).withMessage("Color is required."),
    ]
}

/* ******************************
 * Check data and return errors or continue to Add Inventory
 * ***************************** */
validate.checkAddInventoryData = async (req, res, next) => {
    const {
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
    } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.buildClassificationList()
        let classificationSelect = await utilities.buildClassificationSelect(classification_id)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            classificationSelect,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
        })
        return
    }
    next()
}

module.exports = validate
