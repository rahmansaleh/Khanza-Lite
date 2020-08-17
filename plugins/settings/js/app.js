$(document).ready(function () {
    // Edit Hospital Info
    $('.edit-hospital-link').on('click', function (e) {
        e.preventDefault();
        $(".view-hospital-fields").hide();
        $(".edit-hospital-fields").show();
    });
    $('#update-hospital-info, #cancel-hospital-info').on('click', function (e) {
        e.preventDefault();
        $(".view-hospital-fields").show();
        $(".edit-hospital-fields").hide();
    });

    // Edit Email Settings
    $('.edit-email-link').on('click', function (e) {
        e.preventDefault();
        $(".view-email-fields").hide();
        $(".edit-email-fields").show();
    });
    $('#update-email-info, #cancel-email-info').on('click', function (e) {
        e.preventDefault();
        $(".view-email-fields").show();
        $(".edit-email-fields").hide();
    });
});
