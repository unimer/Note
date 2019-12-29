
const getColor = (color) => {
    switch(color){
        case 0:
            return " bg-info";
            break;
        case 1:
            return " bg-secondary";
            break;
        case 2: 
            return " bg-light";
            break;
        case 3:
            return " bg-success";
            break;
        case 4:
            return " bg-warning";
            break;
        default:
            return " bg-transparent"; 
    }
}

const getPinned = (pinned) => {
    console.log(pinned);
    switch (pinned){
        case true:
            return "bg-warning";
        default: 
            return "bg-transparent";
    }
}

const loadNotes = () => {
    var uri = "http://localhost:5000/note/index";  
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            // $('.toast').toast('show');
            $.each(data, (index, val) =>{
                let element =   "<div class=\"col-sm-4\">" + 
                                    "<div class=\"toast\" data-autohide=\"false\">" +
                                        "<div class=\"toast-header\">" +
                                            
                                            "<strong class=\"mr-auto text-primary\">" + val.title + "</strong>" +
                                            "<small class=\"text-muted\">" + val.added + "</small>" + 
                                        "</div>" +
                                        "<div class=\"toast-body" + getColor(val.color) + "\">" +
                                            val.body + 
                                        "</div>" +
                                        "<div class=\"toast-footer\">" +
                                            "<button type=\"button\" class=\"ml2 mb-1 " + getPinned(val.pinned) + "\"><i class=\"fas fa-map-pin\"></i></button>" +

                                        "</div>" +

                                    "</div>" +
                                "</div>"
                $("#notesCanvas").append(element);
                $('.toast').toast('show');
            });
        },
        fail: () => {
            alert("Connection problem");
        }
    });
}

$(document).ready(() => {
    loadNotes();


      
      
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