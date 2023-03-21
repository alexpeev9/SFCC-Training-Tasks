'use strict';

module.exports = {
    attachToWindow
};

const createErrorNotification = require('base/components/errorNotification');

/**
 * Validates reCaptcha token on registration submit
 * @param {String} token
 */
function verifyReCaptcha(token) {
    const $form = $('.js-form');
    const $submitBtn = $form.find('.js-submit-button');

    const verifyUrl = $submitBtn.data('verify-url');
    $form.spinner().start();
    $.ajax({
        url: verifyUrl,
        type: 'post',
        dataType: 'json',
        data: { token },
        success: function (data) {
            if (!data.success) {
                $form.spinner().stop();
                createErrorNotification($('.error-messaging'), data.errorMessage);
            } else {
                $form.trigger('submit');
            }
        },
        error: function (err) {
            createErrorNotification($('.error-messaging'), err.responseJSON.errorMessage);
        }
    });
}

/**
 * Makes reCaptcha sumbission function global so reCaptcha API can use it as callback
 */
function attachToWindow() {
    window.verifyReCaptcha = verifyReCaptcha;
}
