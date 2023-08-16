$(document).ready(function () {
  $(".location-slider .view-content").not('.slick-initialized').slick({
    infinite: true, slidesToShow: 5, arrows: false, autoplay: true, autoplaySpeed: 8000, dots: true, slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerMode: true,
          slidesToShow: 3,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  });
  if ($(window).width() > 991) {
    if($(".slick-track .location-card").length <= 3){
      $(".slick-track .location-card").addClass('slick-active');
    }
  }
});

 

$(document).ajaxComplete(function () {
  $(".location-slider .view-content").not('.slick-initialized').slick({
    infinite: true, slidesToShow: 5, arrows: false, autoplay: true, autoplaySpeed: 8000, dots: true, slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerMode: true,
          slidesToShow: 3,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
          arrows: false,
        },
      },
    ],
  });
  if ($(window).width() > 991) {
    if($(".slick-track .location-card").length <= 3){
      $(".slick-track .location-card").addClass('slick-active');
    }
  }
});