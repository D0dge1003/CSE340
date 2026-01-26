const inventoryModel = require('../models/inventoryModel');

const Util = {};

Util.buildClassificationList = async function (classification_id = null) {
    let data = await inventoryModel.getClassifications();
    let classificationList = '<ul>';
    classificationList += '<li><a href="/" title="Home">Home</a></li>';
    data.forEach((row) => {
        classificationList += '<li>';
        classificationList += '<a href="/inv/type/' + row.classification_id + '" title="See our ' + row.classification_name + ' inventory">';
        classificationList += row.classification_name;
        classificationList += '</a>';
        classificationList += '</li>';
    });
    classificationList += '</ul>';
    return classificationList;
};

/* ****************************************
 *  Build Classification Select List
 * **************************************** */
Util.buildClassificationSelect = async function (classification_id = null) {
    let data = await inventoryModel.getClassifications()
    let classificationList =
        '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.forEach((row) => {
        classificationList += '<option value="' + row.classification_id + '"'
        if (
            classification_id != null &&
            row.classification_id == classification_id
        ) {
            classificationList += " selected "
        }
        classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
}

Util.buildVehicleDetailHTML = function (vehicle) {
    if (!vehicle) {
        return '<p>Vehicle not found.</p>';
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatMileage = (miles) => {
        return new Intl.NumberFormat('en-US').format(miles);
    };

    let html = '<div class="vehicle-detail">';
    html += '<div class="vehicle-image">';
    html += '<img src="' + vehicle.inv_image + '" alt="' + vehicle.inv_make + ' ' + vehicle.inv_model + '">';
    html += '</div>';
    html += '<div class="vehicle-info">';
    html += '<h2>' + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2>';
    html += '<p class="vehicle-price"><strong>Price:</strong> ' + formatPrice(vehicle.inv_price) + '</p>';
    html += '<p class="vehicle-mileage"><strong>Mileage:</strong> ' + formatMileage(vehicle.inv_miles) + ' miles</p>';
    html += '<p class="vehicle-color"><strong>Color:</strong> ' + vehicle.inv_color + '</p>';
    html += '<p class="vehicle-description">' + vehicle.inv_description + '</p>';
    html += '</div>';
    html += '</div>';

    return html;
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<div class="inventory-grid">'
        data.forEach(vehicle => {
            grid += '<div class="vehicle-card">'
            grid += '<a href="/inv/detail/' + vehicle.inv_id
            grid += '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
            grid += 'details"><img src="' + vehicle.inv_thumbnail
            grid += '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
            grid += ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<h3>'
            grid += '<a href="/inv/detail/' + vehicle.inv_id + '" title="View '
            grid += vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
            grid += vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h3>'
            grid += '<span class="price">$'
            grid += new Intl.NumberFormat('en-US').format(vehicle.inv_price)
            grid += '</span>'
            grid += '</div>'
            grid += '</div>'
        })
        grid += '</div>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util;
