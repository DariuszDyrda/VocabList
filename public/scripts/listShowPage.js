$(document).ready(function () {
    $("table").on("click", "#editButton", function () {
        $(this).parents("tr").next().toggleClass("hidden");
    });
    $("table").on("click", "#removeButton", function () {
        
    });
});