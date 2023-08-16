$(document).ready(function () {
  $(".resource-slider .view-content").slick({
    centerMode: false,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
          arrows: false
        },
      },
    ],
  });
});
