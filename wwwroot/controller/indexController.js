
const loadNotes = () => {
    var uri = "http://localhost:5000/note/index";  
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            // $('.toast').toast('show');
            $.each(data, (index, val) =>{
                // console.log(val);
                // let element =  "<div style=\"background-color: lightblue;\" class=\"col-sm-4\">" + 
                // "<h3>" + val.title + "</h3>" + 
                // "<p>" + val.body + "</p>" +
                // "</div>";
                // <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
                let element =   
                                    "<div class=\"toast-header\">" +
                                        "<strong class=\"mr-auto text-primary\">" + val.title + "</strong>" + 
                                            "<small class=\"text-muted\">" + val.added + "</small>" + 
                                    "</div>" +
                                    "<div class=\"toast-body\">" +
                                        val.body +
                                    "</div>";
                $("#notesCanvas").append(element);
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