$(document).ready(function () {

  $('.content-page-storiesih--slider').slick({
    slidesToShow: 2,
    // centerMode: true,
    // centerPadding: "10%",
    speed: 1500,
    swipe: true,
    //dots: true,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
          breakpoint: 991,
           settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  centerMode: true,
                  centerPadding: "10%",
                  speed: 1500,
                  swipe: true,
                  autoplay: true,
                 autoplaySpeed: 8000,
                 dots: true,
              }
      }
    ]
  });
});







