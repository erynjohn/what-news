
function addNote() {
    var id = $('.add-note-target').attr("data-id");
    $("#comment-form").submit(function (e) { 
        e.preventDefault();
        data = {
            name: $('.name').val().trim(),
            body: $('.body').val().trim()
        }
        var url = $(this).attr("action");
        var urls = url+id;
        $.post(urls, data)
        .done(function(data) {
            $('.card-title').append("<p>"+data.name+"</p>")
            $('.card-text').append("<p>"+data.body+"</p>")
        })

        
    });
}
    
$(document).on("click", ".add-note", addNote);


