"use strict";

$.getJSON("/api/items", function (data) {
  console.log(data);

  if (data.length == 0) {
    $(".list_container").append('<p>Jelenleg nincs elérhető termék.</p>');
  } else {
    var table = $('<table id="allTable"></table>');
    table.append("<tr>" + "<th id='allTableth'>ID</th>" + "<th id='allTableth'>Név</th>" + "<th id='allTableth'>Leírás</th>" + "<th id='allTableth'>Ár</th>" + "<th></th><th></th>" + "</tr>");
    $.each(data, function (key, value) {
      var row = $('<tr id="' + value.id + '"></tr>');
      var idCell = $('<td id="allTabletd">' + value.id + '</td>');
      var nameCell = $('<td id="allTabletd">' + value.name + '</td>');
      var countryCell = $('<td id="allTabletd">' + value.desc + '</td>');
      var foundedCell = $('<td id="allTabletd">' + value.price + '</td>');
      var modifyCell = $('<td id="allTabletd"><button class="m-button">Módosítás</button></td>');
      var deleteCell = $('<td id="allTabletd"><button class="d-button">Törlés</button></td>');
      row.append(idCell);
      row.append(nameCell);
      row.append(countryCell);
      row.append(foundedCell);
      row.append(modifyCell);
      row.append(deleteCell);
      table.append(row);
    });
    $(".list_container").append(table);
    $('.m-button').click(function () {
      alert($(this).closest('tr').prop('id'));
    });
    $('.d-button').click(function () {
      var d = $(this).closest('tr').prop('id');
      $.ajax({
        url: 'api/delete/' + d,
        type: 'DELETE',
        success: function success() {
          window.alert("Sikeresen törölted a terméket!");
          location.reload();
        },
        error: function error() {
          window.alert("A törlés sikertelen.");
        }
      });
    });
  }
});