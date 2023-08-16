$(document).ready(function () {
  $(".instagram-slider").slick({
    centerMode: false,
    //   centerPadding: '155px',
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "40px",
          arrows: false,
        },
      },
    ],
  });
});
