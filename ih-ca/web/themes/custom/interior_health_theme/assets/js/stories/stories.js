$(document).ready(function () {
  // $(".accordian-items .acc-title").on("click", function () {
  //   $(this).toggleClass("active");
  //   $(this).next(".acc-content").slideToggle();
  // });
  $(".stories-ih-slider").slick({
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "10%",
    speed: 1500,
    swipe: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 9999,
        settings: "unslick",
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  });
  // $('.accordian-items .acc-title:first-child').toggleClass('active');
  // $('.accordian-items .acc-title:first-child + .acc-content').slideToggle();

});


