$(function () {

    $('form').on('submit', function (e) {

        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'addBook',
            data: $('form').serialize(),
            success: function (data) {
                loadBooks();
            },
            error: function () {
                alert("oops");

            }
        });
    });
});

$(document).ready(function () {
    $.getJSON('authorNames', function (data) {
        var select = $('<select></select>');
        $.each(data, function (key, value) {
            var row = $('<option>' + value + '</option>');
            $(select).append(row);
        });
        $('#authorName').append(select);
    });
});