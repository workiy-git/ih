jQuery(document).ready(function ($) {
  //quicklinks hover
  if($(window).width() > 991){
    $( ".quicklinks" ).hover(function() {
        $( this ).addClass( "hover" );
      }, function() {
        $( this ).removeClass( "hover" );
      }
    );
  }

  //quicklinks symbol click
  if($(window).width() < 992){
    $('.quicklinks .quicklinks-arrow').click(function() {
      $(this).parents('.quicklinks-content').toggleClass('show');
      $(this).parents('.quicklinks-content').siblings().removeClass('show');
    });
  }


});