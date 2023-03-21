module.exports = { manageForms };

function manageForms() {
    showForm('businessAddress', 'privateAddress');
    showForm('privateAddress', 'businessAddress');
}

function showForm(selected, other) {
    $(`#js-${selected}-btn`).on('click', () => {
        const $selectedForm = $(`#js-${selected}-form`);
        if ($selectedForm.hasClass('d-none')) {
            $(`#js-${other}-form`).toggleClass('d-block d-none');
            $selectedForm.toggleClass('d-none d-block');
            $(`#js-${selected}-btn i`).toggleClass('fa-circle-o fa-dot-circle-o');
            $(`#js-${other}-btn i`).toggleClass('fa-dot-circle-o fa-circle-o');
        }
    });
}
