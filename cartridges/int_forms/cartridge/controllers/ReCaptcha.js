'use strict';

/**
 * @namespace ReCaptcha
 */

const server = require('server');

/**
 * ReCaptcha-Verify : This endpoint is called via ajax request when a reCAPTCHA token needs to be verified
 * @name Base/ReCaptcha-Verify
 * @function
 * @memberof ReCaptcha
 * @param {httpparameter} - token - reCAPTCHA response token
 * @param {middleware} - server.middleware.https
 * @param {category} - sensitive
 * @param {renders} - json
 * @param {serverfunction} - post
 */
server.post('Verify', server.middleware.https, function (req, res, next) {
    const Resource = require('dw/web/Resource');

    const errorMessage = Resource.msg('error.message.reCaptcha', 'forms', null);

    const token = req.form.token;

    if (!token) {
        res.json({
            success: false,
            errorMessage
        });

        return next();
    }

    const reCaptchaService = require('~/cartridge/scripts/services/reCaptchaService');

    const response = reCaptchaService.call({
        token
    }).object;

    if (response) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            errorMessage
        });
    }

    next();
});

module.exports = server.exports();
