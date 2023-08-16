var $ = jQuery;
var btn = $(".scrollTop");
var bannerheight = $(".top-banner-header-section").height();
var viewportHeight = $(window).height();

$(window).scroll(function () {
  var topPosition = $(window).scrollTop();
  if (topPosition > bannerheight || topPosition > viewportHeight) {
    btn.fadeIn(300);
  } else {
    btn.fadeOut(300);
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $(window).scrollTop(0);
});
