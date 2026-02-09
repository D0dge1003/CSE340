const express = require("express")
const router = new express.Router()
const wishlistController = require("../controllers/wishlistController")
const utilities = require("../utilities")

const validate = require("../utilities/wishlist-validation")

// Route to build wishlist view
router.get("/", utilities.checkLogin, utilities.handleErrors(wishlistController.buildWishlist))

// Route to add to wishlist
router.post(
    "/add",
    utilities.checkLogin,
    validate.addWishlistRules(),
    validate.checkAddWishlistData,
    utilities.handleErrors(wishlistController.addWishlist)
)

// Route to remove from wishlist
router.post(
    "/remove",
    utilities.checkLogin,
    validate.removeWishlistRules(),
    validate.checkRemoveWishlistData,
    utilities.handleErrors(wishlistController.removeWishlist)
)

module.exports = router
