"use strict";

const server = require("server");
const page = module.superModule;

server.extend(page);

const csrfProtection = require("*/cartridge/scripts/middleware/csrf");
const consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * Product-Show : This endpoint is called to show the details of the selected product
 * @name Base/Product-Show
 * @function
 * @memberof Product
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {querystringparameter} - pid - Product ID
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append("Show", csrfProtection.generateToken, (req, res, next) => {
    let phone = customer.profile ? customer.profile.phoneHome : "";

    const subscribeForm = server.forms.getForm("subscribe");
    res.setViewData({
        phone,
        subscribeForm,
    });

    response.setExpires(0);
    next();
});

/**
 * Product-Show : This endpoint is called to show the details of the selected product
 * @name Base/Product-Show
 * @function
 * @memberof Product
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {querystringparameter} - pid - Product ID
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.post(
    "Subscribe",
    consentTracking.consent,
    csrfProtection.validateAjaxRequest,
    (req, res, next) => {
        const { productId } = req.querystring;
        const subscribeForm = server.forms.getForm("subscribe");
        const formErrors = require("*/cartridge/scripts/formErrors");
        const Resource = require("dw/web/Resource");

        if (!subscribeForm.valid) {
            res.json({
                success: false,
                fields: formErrors.getFormErrors(subscribeForm),
            });
        }
        const SubscribeToProductHelpers = require("*/cartridge/scripts/helpers/subscribeService");

        try {
            const currObject =
                SubscribeToProductHelpers.getObjectInstance(productId);
            SubscribeToProductHelpers.addPhoneNumber(
                currObject,
                subscribeForm.phone.value
            );
            res.json({
                success: true,
                notificationMessage: Resource.msg(
                    "twilio.submit.success",
                    "product",
                    null
                ),
            });
        } catch (err) {
            res.json({
                success: false,
                notificationMessage: Resource.msg(
                    "twilio.submit.fail",
                    "product",
                    null
                ),
            });
        }

        return next();
    }
);

module.exports = server.exports();
