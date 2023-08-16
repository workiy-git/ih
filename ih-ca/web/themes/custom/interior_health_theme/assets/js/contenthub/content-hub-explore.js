var $ = jQuery;
var hubExplore = hubExplore || {};


hubExplore = {
    iniator: function () {
        $('.hub-explore h2.hub-title').on('click',function () {
            $(this).toggleClass('active');
            // if ($(window).width() > 992) {
              $(this).siblings('.hub-items-wrapper').slideToggle();
            // }
        });
    }
}

$(document).ready(function() {




    hubExplore.iniator();
        
    $(".hub-items-wrapper").slick({
        infinite: false,
        slidesToShow: 3,
        arrows: false,
        autoplaySpeed: 2000,
        dots: true,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              arrows: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "12px",
              arrows: false
            }
          },
        ],
      });
});
