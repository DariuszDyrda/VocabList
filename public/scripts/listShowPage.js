$(document).ready(function () {
    $("table").on("mouseover", ".wordRow", function () {
        //$( this ).css("background-color", "blue");
    })

    $("table").on("click", ".wordRow td a", function () {
        $(this).parents("tr").next().toggleClass("hidden");
    console.log("clicked");
    })
});