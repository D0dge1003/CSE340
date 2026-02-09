const utilities = require("../utilities/")
const wishlistModel = require("../models/wishlist-model")

/* ****************************************
 *  Deliver Wishlist View
 * *************************************** */
async function buildWishlist(req, res, next) {
    let nav = await utilities.buildClassificationList()

    // Get account_id from the session/token data stored in locals
    const account_id = res.locals.accountData.account_id
    const wishlistItems = await wishlistModel.getWishlistByAccountId(account_id)

    res.render("account/wishlist", {
        title: "My Wishlist",
        nav,
        errors: null,
        wishlistItems
    })
}

/* ****************************************
 *  Process Add to Wishlist
 * *************************************** */
async function addWishlist(req, res, next) {
    const { inv_id } = req.body
    const account_id = res.locals.accountData.account_id

    // Check if already exists
    const exists = await wishlistModel.checkExisting(account_id, inv_id)
    if (exists > 0) {
        req.flash("notice", "That vehicle is already in your wishlist.")
        return res.redirect(`/inv/detail/${inv_id}`)
    }

    const addResult = await wishlistModel.addWishlistItem(account_id, inv_id)

    if (addResult) {
        req.flash("notice", "Vehicle added to your wishlist.")
        res.redirect(`/inv/detail/${inv_id}`)
    } else {
        req.flash("notice", "Sorry, adding to wishlist failed.")
        res.redirect(`/inv/detail/${inv_id}`)
    }
}

/* ****************************************
 *  Process Remove from Wishlist
 * *************************************** */
async function removeWishlist(req, res, next) {
    const { wishlist_id } = req.body
    const removeResult = await wishlistModel.removeWishlistItem(wishlist_id)

    if (removeResult) {
        req.flash("notice", "Vehicle removed from your wishlist.")
        res.redirect("/wishlist")
    } else {
        req.flash("notice", "Sorry, removing from wishlist failed.")
        res.redirect("/wishlist")
    }
}

module.exports = { buildWishlist, addWishlist, removeWishlist }
