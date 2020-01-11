
let noteEditColor = -1

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

const pinNote = (noteId) => {
    const uri = "note/pin";

    $.ajax({
        url: uri + "?id=" + noteId,
        type: "GET",
        success: (data, status, xhr) => {
            if (!data.errorMessages){
                $("#noteEditDialog").modal('hide');
                loadNotes();
            }
        },
        fail: () => {
            alert("Connection problem");
        }
    });
}

const deleteNote = (noteId) => {
    const uri = "note/delete";
    $.ajax({
        url: uri + "?id=" + noteId,
        type: "GET",
        success: (data, status, xhr) => {
            if (!data.errorMessages){
                $("#noteEditDialog").modal('hide');
                loadNotes();
            }
        },
        fail: () => {
            alert("Connection problem");
        }
    });
}

const renderElement = (val) => {
    let element =   "<div class=\"col-sm-4\">" + 
                        "<div class=\"toast\" data-autohide=\"false\">" +
                            "<div class=\"toast-header\">" +
                                "<strong class=\"mr-auto text-primary\">" + val.title + "</strong>" +
                                "<small class=\"text-muted\">" + val.added + "</small>" + 
                            "</div>" +
                            "<div class=\"toast-body " + getColor(val.color) + "\">" +
                                val.body + 
                            "</div>" +
                            "<div class=\"toast-footer\">" +
                                "<button id=\"pin-" + val.id + "\"" + "type=\"button\" class=\"ml2 mb-1 " + getPinned(val.pinned) + "\"><i class=\"fas fa-map-pin\"></i></button>" +
                                "<small class=\"text-muted float-right\">" + val.organizationId + "</small>" + 
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
            $( "#addFooter").hide();
            $("#editFooter").show();

     

            $("#save-button").on('click', () => {
                editNotePost(noteId);
            });

                // delete note 
            $("#deleteNoteButton").on('click', () => {
                deleteNote(noteId);
            });
        })
        .data("note", {id: val.id});
    $("#notesCanvas").append(newElement);

    $("#pin-" + val.id).on('click', () => {
        pinNote($("#note" + val.id).data("note").id)
        // console.log($("#note" + val.id).data("note").id);
    });
}

const loadNotes = () => {
    var uri = "/note/index";  
    $.ajax({
        url: uri,
        type: "GET",
        success: (data, status, xhr) => {
            // $('.toast').toast('show');
            $("#notesCanvas").empty();
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
    var uri = "/note/edit";


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
    var uri = "/note/edit";


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
        beforeSend: (xhr) => {
            // xhr.setRequestHeader("Authorization", "Basic " + btoa("rooto" + ":" + "temp123"));
        },
        success: (data, status, xhr) => {
            if (!data.errorMessages){
                $("#noteEditDialog").modal('hide');
                loadNotes();
            }
        },
        fail: () => {
            alert("Connection error");
        }
    }).done(() => {
        loadNotes();
    })
}

const addNotePost = (noteId) => {
    var uri = "/note/add";
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
        beforeSend: (xhr) => {
            // xhr.setRequestHeader("Authorization", "Basic " + btoa("rooto" + ":" + "temp123"));
        },
        success: (data, status, xhr) => {
            if (data.success == false && data.message == "unauthorized"){
                $("#noteErrorMessage").append("<strong>Unauthorized!</strong>").show();
            }
            else if (data.errorMessages === undefined) {
                $("#noteEditDialog").modal('hide');
                loadNotes();
            } else {
                $.each(data.errorMessages, (i, v) => {
                    $("#noteErrorMessage").append("<strong>" + v + "</strong>").show();
                })
                console.log("errorMessages")
            }
        },
        fail: () => {
            alert("Connection error");
        }
    })
}

$(document).ready(() => {
    loadNotes();   
    
    // bind event to registration button
    // $("#registrationBtn").on('click', () => {
    //     const username = $("#username").val();
    //     const email = $("#email").val();
    //     const password = $("#password").val();
    //     const organization = $("#selOrg").val();
    //     // ajaxPost(username, email, password, organization);
    // });
    
    $("#openRegistration").on('click', () => {
        $("#loginDialog").modal('hide');
        $("#registrationDialog").modal('show');

    });

    $("#navbarLogin").on('click', () => {
        // window.location.href = './login.php';
        $("#loginDialog").modal('show');
    });

    $("#addNote").on('click', () => {
        $("#noteEditDialog").modal('show');
        $("#editFooter").hide();
        $("#addFooter").show();
        $("#addButton").on('click', () => {
            addNotePost();
        })

    });



    // color buttons
    $("#warning-color").on('click', () => {
        $("#modalHeader").removeClass()
        .addClass("modal-header " + getColor(4));
        noteEditColor = 4;
        console.log(getColor(4));
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


});