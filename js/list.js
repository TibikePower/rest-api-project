$('#mf').on('submit', function (submit) {
    submit.preventDefault();
    var iArr=$('#mf').serializeArray();
    var idValue=document.getElementById('mid').value;
    var i = {
        id: idValue,
        name: iArr[0].value,
        desc: iArr[1].value,
        price: iArr[2].value
    };
    $.ajax({
        url: 'api/api.php',
        type: "PUT",
        data: JSON.stringify(i),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            alert(data.result);
            location.reload();
        },
        error: function(){
            alert("Nem sikerült a módosítás!");
        }
     });
});
$.getJSON("api/api.php", function(data) {
    $('#mf').hide();
    if(data.result==="No data found" ){
        $(".list_container").append('<p>Jelenleg nincs elérhető termék.</p>');
    }else{
        var table = $('<table id="allTable"></table>');
        table.append("<tr>" +
            "<th id='allTableth'>ID</th>" +
            "<th id='allTableth'>Név</th>" +
            "<th id='allTableth'>Leírás</th>" +
            "<th id='allTableth'>Ár</th>" +
            "<th></th><th></th>"+
            "</tr>");
            data.result.forEach(d => {
                var row = $('<tr id="' + d.id + '"></tr>');
                var idCell = $('<td id="allTabletd">' + d.id + '</td>');
                var nameCell = $('<td id="allTabletd">' + d.name + '</td>');
                var countryCell = $('<td id="allTabletd">' + d.description + '</td>');
                var foundedCell = $('<td id="allTabletd">' + d.price + '</td>');
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
            $("#mid").val($(this).closest('tr').prop('id'));
            $('#additem').hide();
            $('#mf').show();
        });
        $('.d-button').click(function () {
            var d = $(this).closest('tr').prop('id');
            $.ajax({
                url: 'api/api.php',
                type: 'DELETE',
                data: JSON.stringify({"id": d}),
                success: function (data) {
                    alert(data.result);
                    location.reload();
                },
                error: function () {
                    window.alert("A törlés sikertelen.");
                }
            });
        });
    }
});
