const utilities = require("../utilities/")
const inventoryModel = require("../models/inventoryModel")

/* ***************************
 *  Build management view
 * ************************** */
async function buildManagement(req, res, next) {
    let nav = await utilities.buildClassificationList()
    res.render("inventory/management", {
        title: "Inventory Management",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Build Add Classification view
 * ************************** */
async function buildAddClassification(req, res, next) {
    let nav = await utilities.buildClassificationList()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Process Add Classification
 * ************************** */
async function addClassification(req, res) {
    let nav = await utilities.buildClassificationList()
    const { classification_name } = req.body

    const addResult = await inventoryModel.addClassification(classification_name)

    if (addResult.rowCount) {
        req.flash(
            "notice",
            `The ${classification_name} classification was successfully added.`
        )
        nav = await utilities.buildClassificationList() // Rebuild nav to show new classification
        res.status(201).render("inventory/management", {
            title: "Inventory Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the add classification failed.")
        res.status(501).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: null,
            classification_name,
        })
    }
}

/* ***************************
 *  Build Add Inventory view
 * ************************** */
async function buildAddInventory(req, res, next) {
    let nav = await utilities.buildClassificationList()
    let classificationSelect = await utilities.buildClassificationSelect()
    res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationSelect,
        errors: null,
    })
}

/* ***************************
 *  Process Add Inventory
 * ************************** */
async function addInventory(req, res) {
    let nav = await utilities.buildClassificationList()
    const {
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
    } = req.body

    const addResult = await inventoryModel.addInventory(
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    )

    if (addResult.rowCount) {
        req.flash(
            "notice",
            `The ${inv_make} ${inv_model} was successfully added.`
        )
        res.status(201).render("inventory/management", {
            title: "Inventory Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the add inventory failed.")
        let classificationSelect = await utilities.buildClassificationSelect(classification_id)
        res.status(501).render("inventory/add-inventory", {
            title: "Add Inventory",
            nav,
            classificationSelect,
            errors: null,
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
    }
}


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
async function getInventoryJSON(req, res, next) {
    const classification_id = parseInt(req.params.classification_id)
    const invData = await inventoryModel.getInventoryByClassificationId(classification_id)
    if (invData[0].inv_id) {
        return res.json(invData)
    } else {
        next(new Error("No data returned"))
    }
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
async function buildByClassificationId(req, res, next) {
    const classification_id = req.params.classificationId
    const data = await inventoryModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.buildClassificationList()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

async function buildByInventoryId(req, res, next) {
    const inv_id = req.params.invId;
    const vehicle = await inventoryModel.getInventoryById(inv_id);
    const html = utilities.buildVehicleDetailHTML(vehicle);
    let nav = await utilities.buildClassificationList();
    const title = vehicle ? `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}` : "Vehicle Not Found";

    res.render("./inventory/detail", {
        title: title,
        nav,
        html,
    });
}

module.exports = {
    buildByClassificationId,
    buildByInventoryId,
    getInventoryJSON,
    buildManagement,
    buildAddClassification,
    addClassification,
    buildAddInventory,
    addInventory
}
