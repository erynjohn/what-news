$(document).on("click", ".comment-btn", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        type: "GET",
        url: "/api/news/"+thisId,
        success: function (response) {
            console.log(response);
            
        }
    });
})