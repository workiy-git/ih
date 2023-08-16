var $ = jQuery;

if ($(window).width() < 992) {
  $(".stories-filter").click(function () {
    $(this).siblings("form").fadeToggle();
  });
}
$(".stories-search").click(function () {
  $(".stories-search-submit").trigger("click");
});
