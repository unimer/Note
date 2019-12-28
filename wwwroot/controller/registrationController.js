
const loadOrganizations = () => {
    var uri = "http://localhost:5000/note/getOrganization";  
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            $.each(data, (index, val) =>{
                console.log(val.key);
                console.log(val.value);
                $("#selOrg").append(new Option(val.value, val.key));
            });
        },
        fail: () => {
            alert("Connection problem");
        }
    });
}

const ajaxPost = (username, email, password, organization) => {
    
    const uri = "http://localhost:5000/user/add"

    $.ajax({
        type: 'POST',
        url: uri,
        data: {
            username: username,
            email: email,
            password: password,
            organization: organization
        },
        dataType: 'json',

        success: (data, status, xhr) => {
            if (data.errorMessages){
                $("#errorMessage").show();
            }
            else {
                window.location.href = './login.php'
            }
        },
        fail: () => {
            console.log("fail");
        }

    })    
}


$(document).ready(() => {
    loadOrganizations();

    // bind event to registration button
    $("#registrationBtn").on('click', () => {
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const organization = $("#selOrg").val();
        ajaxPost(username, email, password, organization);
    });
    $("#login").on('click', () => {
        window.location.href = './login.php';
    });

});