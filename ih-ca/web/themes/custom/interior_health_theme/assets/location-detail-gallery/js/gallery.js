jQuery(document).ready(function ($) {
  if($(window).width() < 992){
    $('.ih-gallery-inner').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '35px',
      arrows: false,
      dots: true,
    });
  }

  if($(window).width() > 991){
    function myGallery() {
      $('.ih-gallery-inner').each(function(){
        var maxLength = $('.ih-gallery-inner .ih-gallery-single').length;
        if(maxLength == 2)
        {
          $('.ih-gallery-inner').addClass('two-img');
        }
        if(maxLength == 3)
        {
          $('.ih-gallery-inner').addClass('three-img');
        }
        if(maxLength == 4)
        {
          $('.ih-gallery-inner').addClass('four-img');
        }
        if(maxLength == 5)
        {
          $('.ih-gallery-inner').addClass('five-img');
        }
        if(maxLength > 5)
        {
          $('.ih-gallery-inner').addClass('five-plus-img');
          if($('.ih-gallery-inner').hasClass('five-plus-img'))
          {
            $('.ih-gallery-inner .ih-gallery-single:nth-child(5) a').prepend('<div class="overlay"><span>+5</span>');
          }
        }
      });
    }
    $('.ih-gallery-inner .ih-gallery-single').click(function(){
      $(this).parent().removeClass('two-img').removeClass('three-img').removeClass('four-img').removeClass('five-img').removeClass('five-plus-img');
      $(this).parents('.ih-gallery').addClass('popup-view');
    });


    $('.ih-gallery-wrapper .five-more-section .close-btn').click(function(){
      $(this).parents('.ih-gallery').removeClass('popup-view');
      myGallery();
    });
    myGallery();
  }
});

$(document).ajaxComplete(function () {
  if($('a[href="#tab-services"]').hasClass('active'))
  {
      $( "#tab-services" ).addClass( "active" );
  }
});