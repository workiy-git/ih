var $ = jQuery;
$(document).ready(function ($) {
  $(".service-detail-faq h2.accordion-header").click(function () {
    $(this).siblings(".accordion-collapse").toggleClass("show");
    $(this).toggleClass("collapsed");
  });
});