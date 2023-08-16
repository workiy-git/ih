var $ = jQuery;
var detailShowMap = detailShowMap || {};

detailShowMap = {
  toggler: function (context) {
    $(".location-map .map-close-btn", context).once('interior_show_map').on('click', function () {
      $(".navigator .yellow-btn").trigger("click");
    });
    $(".navigator .yellow-btn", context).once('interior_show_map').on('click', function () {
      $(this).toggleClass("showing");
      if ($(this).hasClass("showing")) {
        $(this).text("Hide Map");
      } else {
        $(this).text("Show Map");
      }
      $(".location-map").fadeToggle();
    });
    if ($(window).width() < 992) {
      $(".location-links").insertAfter(".location-map");
      $(".location-contact").insertAfter(".location-links");

      $(".navigator .location-image").height($(".navigator .top-banner-header-content").height());
    }
  }
};

// $(document).ready(function () {
//   detailShowMap.toggler();
//   detailShowMap.mobilePositionChange();
// });

// $(document).ajaxComplete(function () {
//   detailShowMap.toggler();
//   detailShowMap.mobilePositionChange();
// });


(function ($) {
	Drupal.behaviors.interior_show_map = {
        attach: function (context) {
          detailShowMap.toggler(context);
        }
    }
})(jQuery);