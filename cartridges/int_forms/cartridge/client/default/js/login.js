'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('base/login/login'));
    processInclude(require('./login/showPassword'));
    processInclude(require('./login/recaptchaVerify'));
});
