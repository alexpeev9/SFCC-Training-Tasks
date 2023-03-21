'use strict';

/**
 * @namespace Login
 */

var server = require('server');
server.extend(module.superModule);

/**
 * Login-Show : This endpoint is called to load the login page
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.append('Show', function (req, res, next) {
    const URLUtils = require('dw/web/URLUtils');
    const Site = require('dw/system/Site');

    const { reCaptchaKey } = Site.getCurrent().getPreferences().custom;

    const reCaptchaConfig = {
        siteKey: reCaptchaKey,
        verifyUrl: URLUtils.url('ReCaptcha-Verify')
    };

    const viewData = res.getViewData();
    viewData.reCaptcha = reCaptchaConfig;
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
