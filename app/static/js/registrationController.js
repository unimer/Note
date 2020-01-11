
const loadOrganizations = () => {
    var uri = "/note/getOrganization";  
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            $.each(data, (index, val) =>{
                $("#selOrg").append(new Option(val.value, val.key));
            });
        },
        fail: () => {
            alert("Connection problem");
        }
    });
}

const ajaxPost = (username, email, password, organization) => {
    
    const uri = "/user/add"

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
                $("#registrationErrorMessage").show();
            }
            else {
                $("#registrationDialog").modal('hide');
                $("#loginDialog").modal('show');
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
        const username = $("#registrationUsername").val();
        const email = $("#registrationEmail").val();
        const password = $("#registrationPassword").val();
        const organization = $("#selOrg").val();
        ajaxPost(username, email, password, organization);
    });


});