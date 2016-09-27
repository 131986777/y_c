$(function() {
    $('[data-hover="dropdown"]').mouseenter(function() {
        $(this).parent('.dropdown').toggleClass('open').mouseleave(function () {
            $(this).removeClass('open');
        });
    });
});