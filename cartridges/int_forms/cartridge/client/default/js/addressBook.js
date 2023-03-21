'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('./addressBook/manageForms'));
    processInclude(require('base/addressBook/addressBook'));
});
