

$(document).ready(function () {
    $("#login").on('click', function () {
        var username = $("#username").val();
        var password = $("#password").val();

        var uri = "http://127.0.0.1:5000/login"    

        var data = null;

        $.ajax({
            type: 'POST',
            url: uri,
            crossDomain: true,
            data: {
                username: username,
                password: password
            },
            
            dataType: 'json',
            success: (msg, status, xhr) => {
                data = msg;
                if (data.success === true) {
                    $("#loginDialog").modal('hide');
                    $.session.set("username", username);
                    $.session.set("password", password);
                } else {
                    $("#errorMessage").show();
                }
            },
            fail: () => {
                alert("Connection error");
            }
        });
    });
});

$(document).ready(() => {
    $('#registrationBtn').on('click', () => {
        window.location.href = './registration.php'
    });
});