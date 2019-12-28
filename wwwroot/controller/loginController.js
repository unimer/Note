

$(document).ready(function () {
    $("#login").on('click', function () {
        var username = $("#username").val();
        var password = $("#password").val();

        var uri = "http://localhost:5000/login"    

        $.ajax({
            type: 'POST',
            url: uri,
            crossDomain: true,
            data: {
                username: username,
                password: password
            },
            
            dataType: 'application/json'
        }).done(() => {
            console.log("nikola");
        });
        console.log(username, password);
    });
});
