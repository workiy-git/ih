(function($) {
    Drupal.behaviors.near_you = {
        attach: function(context) {
            if ($(window).width() > 992) {
                $(".near-you-icon", context).once('interior_health_theme').on('click', function() {
                  $(".near-you-content").slideToggle("slow");
                  $(".near-you-filter").fadeToggle("slow");
                  $(".near-you-header").toggleClass("border-btm");
                  $(".near-you-icon").toggleClass("rotate-arrow");
                });
              }
              
            if ($(window).width() < 992) {
                $('.near-you-icon', context).once('interior_health_theme').on('click', function() {
                    $(".near-you-content").slideToggle("slow");
                    $(this).toggleClass("active");
                    $('span').toggleClass("hide");
                    if ( $(this).hasClass( "active" ) ) {
                        $(this).text( "Hide List" );
                    } else {
                        $(this).text( "Show List" );
                    }
                });
            }
        
            var getText = $('.near-you-filter .form-item-field-location-type-target-id select option[selected="selected"]').text();
            if (getText != 'All') {
                $('.near-you-header .location-category').text(getText);
            } else {
                $('.near-you-header .location-category').text('All Locations');
            }
            $('.current-location', context).once('interior_health_theme').on('click', function() {
                var user_address = sessionStorage.getItem("user_address");
                if (typeof user_address != 'undefined' || user_address != null || user_address != '') {
                    $('.service-form-combine input').val(user_address);
                }
            });
        }
    }
})(jQuery);