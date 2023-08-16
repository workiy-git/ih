var $ = jQuery;
var locationPopup = locationPopup || {};


// $(document).ajaxComplete(function () {
//   $(".near-you-icon").click(function () {
//     $(".near-you-content").slideToggle("slow");
//   });
//   if ($(window).width() > 992) {
//     $(".near-you-icon").click(function () {
//       $(".near-you-filter").fadeToggle("slow");
//       $(".near-you-header").toggleClass("border-btm");
//       $(".near-you-icon").toggleClass("rotate-arrow");
//     });
//   }
//   if ($(window).width() < 992) {
//     $('.near-you-icon').click(function() {
//       $(this).toggleClass("active");
//       $('span').toggleClass("hide");
//       if ( $(this).hasClass( "active" ) ) {
//         $(this).text( "Hide List" );
//       } else {
//         $(this).text( "Show List" );
//       }
//     });
//   }
// });

locationPopup = {
  locationPopupActions: function () {
    setTimeout(function () {
      $(".near-you-map .geolocation-map-container div[role='button']").on("click", function () {
          // console.log("cliked on pin");
          if ($(window).width() > 992 && $(".near-you-content").css('display') == 'none') {
              $(".near-you-icon").trigger('click');
            }
          $(".tooltip-overlay-wrapper").addClass("show");
          var tooltipContent = $(".geolocation-map-container div[role='dialog'] .map-tooltip").clone();
            $(".near-you .tooltip-overlay, .near-you-map .tooltip-overlay").empty().append(tooltipContent);
        });
        $(".tooltip-overlay-wrapper > button ").on("click", function(){
          console.warn("child button clicked");
          $(".tooltip-overlay-wrapper").removeClass("show");
        });
        $('.near-you-map .current-location').on('click',function () {
          var user_address = sessionStorage.getItem("user_address");
          if (typeof user_address != 'undefined' || user_address != null || user_address != '') {
            $('.service-form-combine input').val(user_address);
            $(".service-form-distance select").prop("disabled", false);
            $(".service-form-address").siblings(".form-actions").find("input[value='Search Services']").trigger('click');
            $(".service-form-address").siblings(".form-actions").find("input[value='Apply']").trigger('click');
          }
          else {
            if (!$(".current-location-text").hasClass('hidden')) {
              $(".current-location-text").addClass("hidden");
            }
            $(".service-form-distance select").prop("disabled", true);
          }
      });
    }, 2000);
  },

  nearYouHeader: function() {
    function isElementOverflowing(element) {
      var overflowX = element.offsetWidth < element.scrollWidth,
        overflowY = element.offsetHeight < element.scrollHeight;
    
      return (overflowX || overflowY);
    }
    
    function wrapContentsInMarquee(element) {
      var marquee = document.createElement('marquee'),
        contents = element.innerText;
        
      marquee.innerText = contents;
      element.innerHTML = '';
      element.appendChild(marquee);
    }
    
    var element = document.querySelector('.near-you-header h2');
    
    if (isElementOverflowing(element)) {
      wrapContentsInMarquee(element);
    }

  }
}

$(document).ready(function () {
  locationPopup.locationPopupActions();
  locationPopup.nearYouHeader();
});

$(document).ajaxComplete(function () {
  locationPopup.locationPopupActions();
  locationPopup.nearYouHeader();
});
