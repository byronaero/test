$(function () {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $('#slider').slider({
        min: 0,
        max: 11,
        step: 1,
        create: function (event, ui) {
            $('#selectedMonth').text(months[0]);
        },
        slide: function (event, ui) {
            $('#selectedMonth').text(months[ui.value]);
        }
    });
});
