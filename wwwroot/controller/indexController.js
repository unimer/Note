
let noteEditColor = null;

const getColor = (color) => {
    switch(color){
        case 0:
            return " bg-info text-white";
            break;
        case 1:
            return " bg-secondary text-white";
            break;
        case 2: 
            return " bg-danger text-white";
            break;
        case 3:
            return " bg-success text-white";
            break;
        case 4:
            return " bg-warning ";
            break;
        default:
            return " bg-transparent"; 
    }
}

const getPinned = (pinned) => {
    switch (pinned){
        case true:
            return "bg-warning";
        default: 
            return "bg-transparent";
    }
}

const renderElement = (val) => {
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
                                "<button id=\"pin-" + val.id + "\"" + "type=\"button\" class=\"ml2 mb-1 " + getPinned(val.pinned) + "\"><i class=\"fas fa-map-pin\"></i></button>" +
                            "</div>" +
                        "</div>" +
                    "</div>"

    const newElement = jQuery(element).attr('id', "note" + val.id)
        .dblclick(() => {
            console.log("TODO edit note with id");
            console.log($("#note" + val.id).data("note").id);
            const noteId = $("#note" + val.id).data("note").id;
            editNoteGet(val.id);
            $( "#noteEditDialog" ).modal('show');

            $("#warning-color").on('click', () => {
                $("#modalHeader").removeClass()
                .addClass("modal-header " + getColor(4));
                noteEditColor = 4;
            });
            $("#info-color").on('click', () => {
                $("#modalHeader").removeClass()
                .addClass("modal-header " + getColor(0));
                noteEditColor = 0;
            });
            $("#secondary-color").on('click', () => {
                $("#modalHeader").removeClass()
                .addClass("modal-header " + getColor(1));
                noteEditColor = 1;
            });
            $("#success-color").on('click', () => {
                $("#modalHeader").removeClass()
                .addClass("modal-header " + getColor(3));
                noteEditColor = 3;
            });
            $("#danger-color").on('click', () => {
                $("#modalHeader").removeClass()
                .addClass("modal-header " + getColor(2));
                noteEditColor = 2;
            });

            $("#save-button").on('click', () => {
                editNotePost(noteId);
            });
        })
        .data("note", {id: val.id});

    $("#notesCanvas").append(newElement);
    $("#pin-" + val.id).on('click', () => {
        console.log("TODO: pinned");
        console.log($("#note" + val.id).data("note").id);
    });
}

const loadNotes = () => {
    var uri = "http://localhost:5000/note/index";  
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            // $('.toast').toast('show');
            $.each(data, (index, val) =>{
                renderElement(val);

                $('.toast').toast('show');
            });
        },
        fail: () => {
            alert("Connection problem");
        }
    });
}

const editNoteGet = (noteId) => {
    var uri = "http://localhost:5000/note/edit";

    uri = uri + "?id=" + noteId; 
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            
            $("#modalHeader").removeClass()
            .addClass("modal-header " + getColor(data.color));
            
            console.log(data);
            $("#editTitle").val(data.title);
            $("#editBody").val(data.body);
            $("#editPrivate").prop('checked', data.private);
            noteEditColor = data.color
            console.log($("#editPrivate").prop('checked'));
        },
        fail: () => {
            alert("Connection problem");
        }
    })
} 

const editNotePost = (noteId) => {
    var uri = "http://localhost:5000/note/edit";

    uri = uri + "?id=" + noteId;

    const title = $("#editTitle").val();
    const body = $("#editBody").val();
    const private = $("#editPrivate").prop('checked');
    const color = noteEditColor;

    $.ajax({
        url: uri,
        type: "POST",
        data: {
            title: title,
            body: body,
            private: private,
            color: color
        },
        dataType: "json",
        success: (data, status, xhr) => {
            console.log(data);
        },
        fail: () => {
            alert("Connection error");
        }
    })
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