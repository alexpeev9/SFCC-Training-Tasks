"use strict";

var processInclude = require("base/util");

$(document).ready(function () {
    processInclude(require("./product/detail")); // needed to extend it, to show and hide subscribtion form on product variation change
    processInclude(require("./product/sendTwilioData"));
});
