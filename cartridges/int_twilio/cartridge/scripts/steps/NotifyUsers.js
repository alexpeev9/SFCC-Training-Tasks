"use strict";

const SEPARATOR = ", ";
const twilioService = require("~/cartridge/scripts/twilioService");
const SubscribeToProductHelpers = require("~/cartridge/scripts/helpers/subscribeService");
const ProductMgr = require("dw/catalog/ProductMgr");
const Status = require("dw/system/Status");
const Logger = require("dw/system/Logger");

/**
 * Notifies all customers subscribed to a product if it's in stock and deletes the custom objects
 * @param {dw.util.HashMap} args
 * @returns {dw.system.Status}
 */
exports.execute = function (args) {
    const iterator = SubscribeToProductHelpers.getAllObjectInstances();
    let currObject;
    try {
        while (iterator.hasNext()) {
            currObject = iterator.next();
            const currProduct = ProductMgr.getProduct(
                currObject.custom.productId
            );
            if (currProduct.availabilityModel.isInStock()) {
                const customerPhoneNumbers =
                    currObject.custom.customerPhoneNumbers.split(SEPARATOR);

                let isError = false;
                const phoneNumbersNotProcessed = [];
                // add logs
                customerPhoneNumbers.forEach((phoneNumber) => {
                    // show only last 2 digits of phone number
                    Logger.info(
                        `********${phoneNumber.slice(
                            -2
                        )} number was notified for ${currProduct.name}`
                    );
                    let serviceResult = twilioService
                        .execute()
                        .call({
                            phoneNumber: phoneNumber,
                            body: `${currProduct.name} is back in stock!`,
                        })
                        .isOk();

                    if (!serviceResult) {
                        isError = true;
                        phoneNumbersNotProcessed.push(phoneNumber);
                    }
                });

                if (isError) {
                    const newPhoneNumbers =
                        phoneNumbersNotProcessed.join(SEPARATOR);
                    SubscribeToProductHelpers.updatePhoneNumbers(
                        newPhoneNumbers,
                        currObject
                    );
                    throw new Error(`Error with ${newPhoneNumbers}`);
                } else {
                    SubscribeToProductHelpers.deleteObjectInstance(currObject);
                }
            }
        }
        return new Status(Status.OK, null, "Process finished.");
    } catch (err) {
        return new Status(Status.ERROR, "ERROR", `Error: ${err.message}`);
    }
};
