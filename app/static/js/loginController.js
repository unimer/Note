

$(document).ready(function () {
    $("#login").on('click', function () {
        var username = $("#username").val();
        var password = $("#password").val();

        var uri = "/login"    

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