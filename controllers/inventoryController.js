const inventoryModel = require('../models/inventoryModel');
const utilities = require('../utilities');

const invCont = {};

invCont.buildByClassificationId = async function (req, res, next) {
    try {
        const classification_id = req.params.classificationId;
        const data = await inventoryModel.getInventoryByClassificationId(classification_id);
        const nav = await utilities.buildClassificationList();

        if (!data || data.length === 0) {
            const error = new Error('No vehicles found for this classification');
            error.status = 404;
            return next(error);
        }

        const className = data[0].classification_id;
        const classificationName = req.query.name || 'Vehicles';

        res.render('inventory/classification', {
            title: classificationName,
            nav,
            vehicles: data,
            classificationName
        });
    } catch (error) {
        next(error);
    }
};

invCont.buildByInventoryId = async function (req, res, next) {
    try {
        const inv_id = req.params.invId;
        const vehicle = await inventoryModel.getInventoryById(inv_id);
        const nav = await utilities.buildClassificationList();

        if (!vehicle) {
            const error = new Error('Vehicle not found');
            error.status = 404;
            return next(error);
        }

        const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle);
        const pageTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`;

        res.render('inventory/detail', {
            title: pageTitle,
            nav,
            vehicleHTML,
            vehicle
        });
    } catch (error) {
        next(error);
    }
};

module.exports = invCont;
