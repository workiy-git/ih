// $('.counter .health-count').each(function () {
// $(this).prop('Counter',0).animate({
// Counter: $(this).text()
// }, {
// duration: 4000,
// easing: 'swing',
// step: function (now) {
// $(this).text(Math.ceil(now));
// }
// });
// });

var viewed = false;

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

function testScroll() {
  if (isScrolledIntoView($(".health-glance")) && !viewed) {
    viewed = true;
    $(".counter .health-count").each(function () {
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 4000,
            easing: "swing",
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          }
        );
    });
  }
}

$(window).scroll(testScroll);