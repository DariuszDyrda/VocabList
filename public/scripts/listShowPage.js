$(document).ready(function () {
    $("table").on("click", "#editButton", function () {
        $(this).parents("tr").next().toggleClass("hidden");
        $(this).parents("tr").toggleClass("hidden");
    });
});