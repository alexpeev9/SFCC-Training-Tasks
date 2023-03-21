"use strict";

const LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");
const BASEFROMNUMBER = `+15675871374`;

/**
 * Creates sms service
 * @returns {Object} returns service configuration
 */
function execute() {
    const response = LocalServiceRegistry.createService("http.twilio.sms", {
        createRequest: function (svc, args) {
            svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
            svc.setRequestMethod("POST");
            return `To=${args.phoneNumber}&From=${BASEFROMNUMBER}&Body=${args.body}`;
        },
        parseResponse: function (svc, client) {
            return JSON.parse(client.text);
        },
        filterLogMessage: function (msg) {
            return msg.replace(/To=(\+?d+)?[\s*\d+]"/, "To=**********");
        },
    });

    return response;
}

module.exports = {
    execute: execute,
};
