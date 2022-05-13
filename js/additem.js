$(function (){
    $('#additem').on('submit', function (submit) {
        submit.preventDefault();
        var iArr=$('#additem').serializeArray();
        var i = {
            name: iArr[0].value,
            desc: iArr[1].value,
            price: iArr[2].value
        };
        $.ajax({
            type: "POST",
            url: 'api/api.php',
            data: JSON.stringify(i),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                alert(data.result);
                location.reload();
            },
            error: function(){
                alert("Nem sikerült hozzáadni!");
            }
         });
    })
});