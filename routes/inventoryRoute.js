const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');

const utilities = require('../utilities');
const validate = require('../utilities/inventory-validation');

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));

// Route to build inventory management view
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildManagement));

router.get("/getInventory/:classification_id", utilities.checkAccountType, utilities.handleErrors(invController.getInventoryJSON))

// Route to build add classification view
router.get("/add-classification", utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification));

// Route to process add classification
router.post(
    "/add-classification",
    utilities.checkAccountType,
    validate.addClassificationRules(),
    validate.checkAddClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view
router.get("/add-inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory));

// Route to process add inventory
router.post(
    "/add-inventory",
    utilities.checkAccountType,
    validate.addInventoryRules(),
    validate.checkAddInventoryData,
    utilities.handleErrors(invController.addInventory)
)

module.exports = router;
