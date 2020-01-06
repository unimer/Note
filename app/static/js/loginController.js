

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
                    location.reload();
                } else {
                    $("#errorMessage").show();
                }
            },
            fail: () => {
                alert("Connection error");
            }
        });
    });

    $("#navbarLogout").on('click', function () {

        console.log("logout");
        var uri = "/logout"    

        var data = null;
        $.ajax({
            type: 'GET',
            url: uri,
            crossDomain: true,

            dataType: 'json',
            success: (msg, status, xhr) => {
                data = msg;
                if (data.success === true) {
                    location.reload();

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