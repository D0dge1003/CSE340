const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');

router.get('/type/:classificationId', invController.buildByClassificationId);
router.get('/detail/:invId', invController.buildByInventoryId);

module.exports = router;
