'use strict';

module.exports = { showPassword };

function showPassword() {
    $('.js-icon').on('click', () => {
        const passwordField = $('.js-password-input');
        const passwordType = passwordField.attr('type');
        const newPasswordType = passwordType === 'password' ? 'text' : 'password';
        passwordField.attr('type', newPasswordType);
    });
}
