$(document).ready(function () {
  $(".content-slider").slick({
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "120px",
    speed: 1500,
    swipe: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 1,
          centerPadding: "320px",
        },
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          centerPadding: "150px",
        },
        breakpoint: 1200,
        settings: {
          centerPadding: "85px",
        },
        breakpoint: 991,
        settings: {
          centerPadding: "40px",
        },
      },
    ],
  });
});
