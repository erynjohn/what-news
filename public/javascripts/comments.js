$('#exampleModal').on('show.bs.modal', function (e) {

    var dataId = $(e.relatedTarget).attr('data-id');
    $('.add-note').attr('data-id', dataId);
    $(this).find('#commentIdSpan').text(dataId);

})