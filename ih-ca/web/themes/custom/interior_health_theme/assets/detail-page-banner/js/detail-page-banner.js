$(".selectBox").on("click", function(e) {
  $(this).toggleClass("show");
  var dropdownItem = e.target;
  var container = $(this).find(".selectBox__value");
  container.text(dropdownItem.text);
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");
});

$(window).scroll(function () {
  if ($(this).scrollTop() < 200) {
     $(".selectBox__value").text("Explore this page");
  } 
});
$(document).ready(function () {
// $('.accordian-items .acc-title:first-child').toggleClass('active');
// $('.accordian-items .acc-title:first-child + .acc-content').slideToggle();
// $(".accordian-items .acc-title").on("click", function () {
// $(this).toggleClass("active");
// $(this).next(".acc-content").slideToggle();
// });
if ($(window).width() < 992) {
  if(!$('.top-banner-header-section .top-banner-header-content .tab-link-section').length)
  {
    $('.top-banner-header-section > .view-content > .tab-link-section').insertAfter('.top-banner-header-section .top-banner-header-content h1');
  }
}
});