
const organizations = () => {
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


$(document).ready(() => {
    
    organizations();
});