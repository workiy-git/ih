$(document).ready(function () {


  $('.location-item .hours').on('click',function () {
    $('.sidebar__widget li a.hours-tab').trigger("click");
  });
 
  setTimeout(function(){
    var user_ll = sessionStorage.getItem("user_ll");
    var destination = $(".location-ll").text();
    if( $('.page-node-type-services').length ) {
      if ( (typeof user_ll != 'undefined') && (user_ll != null) && (user_ll != '') && (typeof destination != 'undefined') && (destination != null) && (destination != '')){
        $.ajax({
          type: "POST",
          url: "/get-distances",
          dataType: "json",
          data: {
            'source': user_ll,
            'destination' : destination,
          },
          success: function (result) {
            if (typeof result.rows[0].elements != 'undefined' || result.rows[0].elements != null || result.rows[0].elements != '') {
              var km = result.rows[0].elements[0].distance.text;
              if (typeof km != 'undefined' || km != null || km != '') {
                $('.location-ll').text(km);
                $(".location-ll").removeClass('hidden');
                $(".location-ll").parent().removeClass('hidden');
              }
            }
          }
        });
      }  
    }

    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      if (result.state != 'denied') {
        var user_address = sessionStorage.getItem("user_address");
        if ((typeof user_address != 'undefined') && (user_address != null) && (user_address != '')) {
          $('.service-form-combine input').val(user_address);
          $(".service-form-distance select").prop("disabled", false);
        }
        else {
          if (!$(".current-location-text").hasClass('hidden')) {
            $(".current-location-text").addClass("hidden");
          }
          $(".service-form-distance select").prop("disabled", true);
        }
      }
    });

  }, 3000);

});

(function ($) {
  Drupal.behaviors.interior_health_location = {
    attach: function (context) {

      $('.views-exposed-form .current-location', context).once('interior_health_location').on('click',function () {
        var user_ll = sessionStorage.getItem("user_ll");
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
          if (result.state != 'denied') {
            var user_address = sessionStorage.getItem("user_address");
            if ((typeof user_address === 'undefined') || (user_address === null) || (user_address === '')) {
              
              var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              };

              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position){
                  
                  var ll = position.coords.latitude + "," + position.coords.longitude;
                  sessionStorage.setItem("user_ll", ll);
                  
                  // Get map Key
                  $.ajax({
                    type: "POST",
                    url: "/get-mapkey",
                    dataType: "json",
                    data: {
                      api: "true"
                    },
                    success: function (key) {
                      // var key = jQuery.parseJSON(msg);
                      // console.log("Key:",key);
                      if (key != 'false') {
                        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + ll + "&sensor=false&key="+key;
                        $.getJSON(url, function (data) {
                        
                          var user_address = data.results.length > 0 ? data.results[2].formatted_address : '';
                          if ((typeof user_address != 'undefined') && (user_address != null) && (user_address != '')) {
                            sessionStorage.setItem("user_address", user_address);
                            var user_address = sessionStorage.getItem("user_address");
                            console.log(user_address);
                            $('.service-form-combine input').val(user_address);
                            $(".service-form-distance select").prop("disabled", false);
                            // $(".service-form-address").siblings(".form-actions").find("input[value='Apply']").trigger('click');
                            if($(window).width() > 720) {
                              // $(".service-form-address").siblings(".form-actions").find("input[value='Search Services']").trigger('click');
                              // $(".service-form-address").siblings(".form-actions").find("input[value='Search Locations']").trigger('click');
                            }
                            // console.log(user_address);
                          }
                          else {
                            if (!$(".current-location-text").hasClass('hidden')) {
                              $(".current-location-text").addClass("hidden");
                            }
                            $(".service-form-distance select").prop("disabled", true);
                          }
                        });
                      }
                      else {
                        if (!$(".current-location-text").hasClass('hidden')) {
                          $(".current-location-text").addClass("hidden");
                        }
                        $(".service-form-distance select").prop("disabled", true);
                      }
                    },
                    error: function (error) {
                      if (!$(".current-location-text").hasClass('hidden')) {
                        $(".current-location-text").addClass("hidden");
                      }
                      $(".service-form-distance select").prop("disabled", true);
                    }
                  });
                },function error(err) {
                  $(".current-location-text").addClass("hidden");
                  $(".service-form-distance select").prop("disabled", true);
                  console.warn(`ERROR(${err.code}): ${err.message}`);
                },options);
              }
              else {
                $(".current-location-text").addClass("hidden");
                $(".service-form-distance select").prop("disabled", true);
                console.log("Browser doesn't support geolocation!");
              }
            }
            else {
              var user_address = sessionStorage.getItem("user_address");
              if ((typeof user_address != 'undefined') && (user_address != null) && (user_address != '')) {
                $('.service-form-combine input').val(user_address);
                $(".service-form-distance select").prop("disabled", false);
                // $(".service-form-address").siblings(".form-actions").find("input[value='Apply']").trigger('click');
                if($(window).width() > 720) {
                  // $(".service-form-address").siblings(".form-actions").find("input[value='Search Locations']").trigger('click');
                  // $(".service-form-address").siblings(".form-actions").find("input[value='Search Services']").trigger('click');
                }
              }
              else {
                if (!$(".current-location-text").hasClass('hidden')) {
                  $(".current-location-text").addClass("hidden");
                }
                $(".service-form-distance select").prop("disabled", true);
              }
            }
          }
        }); // End navigator permissions
      });

      $('.service-form-combine input', context).once('interior_health_location').on('change',function () {
        if ($('.service-form-combine input').val() != '') {
          $(".service-form-distance select").prop("disabled", false);
        }
        else {
          $(".service-form-distance select").prop("disabled", true);
        }
      });

      if ($('.service-form-combine input').val() != '') {
        $(".service-form-distance select").prop("disabled", false);
      }
      else {
        $(".service-form-distance select").prop("disabled", true);
      }
    
      navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state != 'denied') {
          var user_address = sessionStorage.getItem("user_address");
          if ((typeof user_address != 'undefined') && (user_address != null) && (user_address != '')) {
            if ($('.service-form-combine input').val() == user_address) {
              if ($(".current-location-text").hasClass('hidden')) {
                $(".current-location-text").removeClass("hidden");
              }
            }
            else {
              if (!$(".current-location-text").hasClass('hidden')) {
                $(".current-location-text").addClass("hidden");
              }
            }
          }
          else {
            if (!$(".current-location-text").hasClass('hidden')) {
              $(".current-location-text").addClass("hidden");
            }
          }
        } else {
          if (!$(".current-location-text").hasClass('hidden')) {
            $(".current-location-text").addClass("hidden");
          }
        }
      });  //Navigator end

      if ($(".near-you .view-empty h5").length > 0 ) {
        if (!$(".near-you .near-you-header").hasClass('hidden')) {
          $(".near-you .near-you-header p").addClass('hidden');
        }
      }
      else {
        var getText = $('.near-you-filter .form-item-field-location-type-target-id select option[selected="selected"]').text();
        if (getText != 'All') {
            $('.near-you-header .location-category').text(getText);
        } else {
            $('.near-you-header .location-category').text('All Locations');
        }
        if ($(".near-you .near-you-header").hasClass('hidden')) {
          $(".near-you .near-you-header p").removeClass('hidden');
        }
      }

      //hub single
      var hubCount = $('.hub-items-wrapper .slick-track .slick-slide').length;
      if(hubCount == 1)
      {
        $('.hub-items-wrapper').addClass('hubsingle');
      }


      
      
      // $('.hours').click(function(){
      //     $('.hours-tab').trigger('click');
      // });
    }
  }
})(jQuery);