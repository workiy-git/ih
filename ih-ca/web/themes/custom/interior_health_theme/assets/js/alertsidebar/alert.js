var $ = jQuery;
var alertSideBar = alertSideBar || {};

alertSideBar = {
    alertCount: function () {
      var alert_count = $('.total-alert-count').text();
      setTimeout(function () {
      if( alert_count > 0 && alert_count < 10 ) {
        $('.alert-count').text(alert_count); 
      }
      else if( alert_count > 9) {
        $('.alert-count').text("9+");
      }
      else {
        $(".alert-count").hide();
      }
    }, 2000);
    },

    alertSideBarShow: function (context) {
    $(".alerts", context).once('interior_health_alert').on("click", function () {
      $(".alert-overlay").addClass("show");
      $(".bg-overlay").show();
      $("body").css("overflow", "hidden");
    });
  },

  alertSideBarHide: function (context) {
    $(".alert-close", context).once('interior_health_alert').on("click", function () {
      $(this).parents(".alert-overlay").removeClass("show");
      $(".bg-overlay").hide();
      $("body").css("overflow", "auto");
    });
    $(".bg-overlay", context).once('interior_health_alert').on("click", function () {
      $(".alert-overlay .alert-close").trigger("click");
    });
  },
};

// $(document).ready(function () {
//   alertSideBar.alertCount();
//   alertSideBar.alertSideBarShow();
//   alertSideBar.alertSideBarHide();
// });

// $(document).ajaxComplete(function () {
//   alertSideBar.alertCount();
//   alertSideBar.alertSideBarShow();
//   alertSideBar.alertSideBarHide();
// });


(function ($) {
	Drupal.behaviors.interior_health_alert = {
        attach: function (context) {
          alertSideBar.alertCount(context);
          alertSideBar.alertSideBarShow(context);
          alertSideBar.alertSideBarHide(context);
        }
    }
})(jQuery);