'use strict';

/**
 * creates a plain object that contains address information
 * @param {dw.order.OrderAddress} addressObject - User's address
 * @returns {Object} an object that contains information about the users address
 */
function createAddressObject(addressObject) {
    var result;
    if (addressObject) {
        result = {
            address1: addressObject.address1,
            address2: addressObject.address2,
            city: addressObject.city,
            firstName: addressObject.firstName,
            lastName: addressObject.lastName,
            ID: Object.hasOwnProperty.call(addressObject, 'ID') ? addressObject.ID : null,
            addressId: Object.hasOwnProperty.call(addressObject, 'ID') ? addressObject.ID : null,
            phone: addressObject.phone,
            postalCode: addressObject.postalCode,
            stateCode: addressObject.stateCode,
            jobTitle: addressObject.jobTitle,
            postBox: addressObject.postBox,
            salutation: addressObject.salutation,
            secondName: addressObject.secondName,
            companyName: addressObject.companyName,
            suffix: addressObject.suffix,
            suite: addressObject.suite,
            title: addressObject.title,
            countryCode: addressObject.countryCode
        };

        if (addressObject.custom && Object.hasOwnProperty.call(addressObject.custom, 'vat')) {
            result.vat = addressObject.custom.vat;
        }

        if (result.stateCode === 'undefined') {
            result.stateCode = '';
        }
    } else {
        result = null;
    }
    return result;
}

/**
 * Address class that represents an orderAddress
 * @param {dw.order.OrderAddress} addressObject - User's address
 * @constructor
 */
function address(addressObject) {
    this.address = createAddressObject(addressObject);
}

module.exports = address;
