$( function() {
    var word = null;
    var translation = null;
    var wordId = null;
    var dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      modal: true,
    });
 

    $("table").on("click", ".editButton", function () {
        wordId = $(this).data('wordid');
        word = $(this).parents("tr").find("span").first().text();
        translation = $(this).parents("tr").find("span").eq(1).text();
        let action = $('#editForm').attr('action');
         $('#editForm').attr('action',  action + `${wordId}?_method=PUT`);
        $("#word").val(word);
        $("#translation").val(translation);
        dialog.dialog( "open" );
    });
  } );
