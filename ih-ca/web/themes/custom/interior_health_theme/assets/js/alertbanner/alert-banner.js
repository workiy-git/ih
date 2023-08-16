$(document).ready(function () {
  const cautionBannerClosed = sessionStorage.getItem("cautionBannerClosed");
  if (cautionBannerClosed) {
    $(".alter-banner").hide();
  } else {
    $(".caution-close").click(function () {
      $(".alter-banner").hide();
      $(".service-list").removeClass("page-with-caution-bannner");
      sessionStorage.setItem("cautionBannerClosed", "True");
    });
  }
  if (sessionStorage.getItem("cautionBannerClosed") == "True") {
    $(".service-list").removeClass("page-with-caution-bannner");
  }
});
