"use strict";

$(function () {
  $('form').on('submit', function (submit) {
    submit.preventDefault();
    var iArr = $('form').serializeArray();
    var i = {
      name: iArr[0].value,
      desc: iArr[1].value,
      price: iArr[2].value
    };
    $.ajax({
      type: "POST",
      url: 'api/add',
      data: JSON.stringify(i),
      contentType: "application/json; charset=utf-8",
      success: function success(data) {
        alert("Sikeresen hozzáadtad!");
        location.reload();
      },
      error: function error() {
        alert("Nem sikerült hozzáadni!");
      }
    });
  });
});