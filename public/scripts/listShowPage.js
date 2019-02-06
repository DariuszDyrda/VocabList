$('#newWordForm').submit(function(event) {

  /* stop form from submitting normally */
  event.preventDefault();

  /* get some values from elements on the page: */
  var $form = $(this),
      original = $('#newWordOriginal').val(),
      translation = $('#newWordTranslation').val(),
      url = $form.attr('action');
      
  /* Send the data using post */
  var posting = $.post(url, {
      word: {
        original: original,
        translation: translation
      }
  })

  posting.done(function(data) {
    let html = `
    <tr class="wordRow" data-wordid="${data.wordId}">
    <td data-label="Word"><span>${original}</span></td>
    <td data-label="Translation">
        <span>${translation}</span>
        <button class="ui button editButton" style="float: right">Edit</button>
        <form action="/index/${$("table").data('listid')}/words/${data.wordId}?_method=DELETE" method="POST">
            <button type="submit" class="ui button removeButton" style="float: right">Remove</button>
        </form>
    </td>
    </td>
</tr>
    `;
    $('#newWordOriginal').val("");
    $('#newWordTranslation').val("");
    $('tbody').append(html);
  });
});

$( function() {
    var word = null;
    var translation = null;
    var wordId = null;
    var dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      modal: true,
    });
 

    $("table").on("click", ".editButton", function () {
        wordId = $(this).parents("tr").data('wordid');
        word = $(this).parents("tr").find("span").first().text();
        translation = $(this).parents("tr").find("span").eq(1).text();
        let action = $('#editForm').attr('action');
         $('#editForm').attr('action',  action + `${wordId}?_method=PUT`);
        $("#word").val(word);
        $("#translation").val(translation);
        dialog.dialog( "open" );
    });
  } );
