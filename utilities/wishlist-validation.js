const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Add Wishlist Validation Rules
 * ********************************* */
validate.addWishlistRules = () => {
    return [
        body("inv_id")
            .trim()
            .isNumeric()
            .withMessage("Invalid Vehicle ID."),
    ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkAddWishlistData = async (req, res, next) => {
    const { inv_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("notice", "Failed to add to wishlist. Invalid Data.")
        res.redirect(`/inv/detail/${inv_id}`)
        return
    }
    next()
}

/*  **********************************
 *  Remove Wishlist Validation Rules
 * ********************************* */
validate.removeWishlistRules = () => {
    return [
        body("wishlist_id")
            .trim()
            .isNumeric()
            .withMessage("Invalid Wishlist ID."),
    ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkRemoveWishlistData = async (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("notice", "Failed to remove from wishlist. Invalid Data.")
        res.redirect("/wishlist")
        return
    }
    next()
}

module.exports = validate
