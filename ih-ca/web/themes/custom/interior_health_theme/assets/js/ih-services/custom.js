jQuery(document).ready(function ($) {    
    if($(window).width() < 992){
        $('.slider-for').slick({
            centerMode: true,
            infinite: true,
            centerPadding: '40px',
            slidesToShow: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 8000,
            arrows: false,
        });
    }
    if($(window).width() > 991){
        $( ".hover-text" ).mouseover(function() {
            $( this ).trigger('click');
        });
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 8,
            vertical:true,
            asNavFor: '.slider-for',
            dots: false,
            arrows: false,
            focusOnSelect: true,
        });
    }
});
