function init() {
    $("#content").load("lorem.html");
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function loadAuthors() {
    $.getJSON('authors', function (data) {
        var table = $('<table id="authorsTable" border="1"></table>');
        $(table).append(
            '<tr><th>Name</th><th>Nationality</th><th>Birth date</th></tr>');

        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var nameCell = $('<td id="authorId" onclick="openBooks(' + "'" + value['name'] + "'" + ')">' + value['name'] + '</td>');
            var nationCell = $('<td>' + value['nationality'] + '</td>');
            var birthDateCell = $('<td>' + value['birthDate'] + '</td>');
            $(row).append(nameCell);
            $(row).append(nationCell);
            $(row).append(birthDateCell);
            $(table).append(row);
        });
        $('#content').append(table);
    });
}

function loadBooks() {
    $.getJSON('books', function (data) {

        var table = $('<table id="booksTable"></table>');
        $(table).append('<tr><th>title</th><th>genre</th><th>author</th><th>quantity</th><th>available</th><th>publisher</th></tr>');

        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var titleCell = $('<td>' + value.title + '</td>');
            var genreCell = $('<td>' + value.genre + '</td>');
            var authorCell = $('<td>' + value.author + '</td>');
            var quantityCell = $('<td>' + value.quantity + '</td>');
            var availableCell = $('<td>' + value.available + '</td>');
            var publisherCell = $('<td>' + value.publisher + '</td>');

            $(row).append(titleCell);
            $(row).append(genreCell);
            $(row).append(authorCell);
            $(row).append(quantityCell);
            $(row).append(availableCell);
            $(row).append(publisherCell);
            $(table).append(row);
        });

        $('#content').append(table);
    }).error(function (data) {
        alert(data);
    })
}

function openBooks(author) {
    document.cookie = "name=" + author;
    $.getJSON('author', function (data) {
        var table = $('<table id="booksTable"></table>');
        $(table).append('<tr><th>title</th><th>genre</th><th>author</th><th>quantity</th><th>available</th><th>publisher</th></tr>');

        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var titleCell = $('<td>' + value.title + '</td>');
            var genreCell = $('<td>' + value.genre + '</td>');
            var authorCell = $('<td>' + value.author + '</td>');
            var quantityCell = $('<td>' + value.quantity + '</td>');
            var availableCell = $('<td>' + value.available + '</td>');
            var publisherCell = $('<td>' + value.publisher + '</td>');

            $(row).append(titleCell);
            $(row).append(genreCell);
            $(row).append(authorCell);
            $(row).append(quantityCell);
            $(row).append(availableCell);
            $(row).append(publisherCell);
            $(table).append(row);
        })

        $('#content').html(table);
    });
}