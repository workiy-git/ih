var serviceListingPage = serviceListingPage || {};
serviceListingPage = {
    serviceListingScript: function (context) {
        if ($(window).width() > 991) {
            //grid-list
            if (!$('.gird-list-buttons .grid-view').hasClass('active') && !$('.gird-list-buttons .list-view').hasClass('active')) {
                $('.gird-list-buttons .list-view').addClass('active');
            } 
            var resultItem = $('.result-items .result-item');
            if ($('.list-view').hasClass('active')) 
            {
                resultItem.addClass('list-view');
            }
            $('.gird-list-buttons .list-view').on('click',function () {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                if ($('.list-view').hasClass('active')) {
                    resultItem.addClass('list-view');
                }
            });
            $('.gird-list-buttons .grid-view').on('click',function () {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                if ($('.grid-view').hasClass('active')) {
                    resultItem.removeClass('list-view');
                }
            });
        }

        //grid accordion
        $('.path-services .view-service-listing-page > .view-content .views-row:first-child h4.results-title').toggleClass('active');
        $('.path-services .view-service-listing-page > .view-content .views-row:first-child h4.results-title').siblings('.view-service-listing-page').slideToggle();
        $('h4.results-title', context).once('interior_health_theme').on('click',function () {
            $(this).toggleClass('active');
            $(this).siblings('.view-service-listing-page').slideToggle();
        });
        
        if ($(window).width() < 992) {
            //mobile vied popup design
            $('.location-form .yellow-btn', context).once('interior_health_theme').on('click',function () {
                $('body').addClass('mobile-show');
                $('html, body').animate({scrollTop: 0}, 800);
                return false;
            });
            $('.blue-section-wrapper .close-btn', context).once('interior_health_theme').on('click',function () {
                $('body').removeClass('mobile-show');
            });
        }
        //map show hide
        $('.blue-section .yellow-btn', context).once('interior_health_theme').on('click',function () {
            $(this).toggleClass('showing');
            if($(this).hasClass('showing'))
            {
                $(this).text('Hide Map');
            }else{
                $(this).text('Show Map');
            }
            $('.attachment .views-element-container > .view-service-listing-page > .view-content').toggleClass('map-show');
            $('.attachment .views-element-container > .view-location-listing-page > .view-content').toggleClass('map-show');
        });

        if ($('.top-banner-wrapper + .attachment .view-empty').length) 
        {
            $('.top-banner-wrapper .blue-section-wrapper .yellow-btn').addClass('d-none');
        }
        else
        {
            $('.top-banner-wrapper .blue-section-wrapper .yellow-btn').removeClass('d-none');
        }
        
        $('.map-close-btn', context).once('interior_health_theme').on('click',function () {
            $('.blue-section .yellow-btn').trigger('click');
        });
        // get filter text
        var getTitleText = $('.location-form .service-form-keyword input').val();
        $('.filter-wrapper .filter-title .h4').text(getTitleText);
        var getCategoryText = $('.location-form .service-form-category select option[selected="selected"]').text();
        $('.filter-wrapper .filter-category .h4').text(getCategoryText);
        var getAddressText = $('.location-form .service-form-combine input').val();
        $('.filter-wrapper .filter-address .h4').text(getAddressText);
        var getDistanceText = $('.location-form .service-form-distance select option[selected="selected"]').text();
        $(".service-form-distance .ih_drop_down").addClass('disabled');

        var filterTitleText = $('.view-results-filter .filter-title h4').text();
        var filterCategoryText = $('.view-results-filter .filter-category h4').text();
        var filterAddressText = $('.view-results-filter .filter-address h4').text();
        if(filterCategoryText == 'All' && filterTitleText == '' && filterAddressText =='')
        {
                $('.view-results-filter').addClass('d-none');
        }
        if(filterCategoryText == 'All')
        {
            $('.view-results-filter .filter-category').hide();
        }

        if ($('.location-form .service-form-combine input').val().length > 0 ) {
            $('.filter-wrapper .filter-distance .h4').text(getDistanceText);
            $(".service-form-distance .ih_drop_down").removeClass('disabled');
            // $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
        }

        $('.location-form .service-form-combine input').focusout(function(){
            if($(this).val().length > 0) {
                $(".service-form-distance .ih_drop_down").removeClass('disabled');
            }
            else {
             $(".service-form-distance .ih_drop_down").addClass('disabled');
            }
        });
        
        $('.location-form .yellow-btn', context).once('interior_health_theme').on('click',function () {
            // $('.path-services .view-service-listing-page').addClass('show');
            var getTitleText = $('.location-form .service-form-keyword input').val();
            $('.filter-wrapper .filter-title .h4').text(getTitleText);
            var getCategoryText = $('.location-form .service-form-category select option[selected="selected"]').text();
            $('.filter-wrapper .filter-category .h4').text(getCategoryText);
            var getAddressText = $('.location-form .service-form-combine input').val();
            $('.filter-wrapper .filter-address .h4').text(getAddressText);
            var getDistanceText = $('.location-form .service-form-distance select option[selected="selected"]').text();
            if ($('.location-form .service-form-combine input').val().length > 0 ) {
                $('.filter-wrapper .filter-distance .h4').text(getDistanceText);
            }
        });
        

        $('.filter-wrapper .filter-close', context).once('interior_health_theme').on('click',function () {
            var getParent = $(this).parent().attr('class');
            if(getParent == "filter-category")
            {
                $('.location-form .service-form-category select option[selected="selected"]').removeAttr("selected");
                $('.location-form .service-form-category select option[value="All"]').attr("selected", "selected");
                $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
            }
            else if(getParent == "filter-distance")
            {
                $('.location-form .service-form-distance select option[selected="selected"]').removeAttr("selected");
                $('.location-form .service-form-distance select option[value="5"]').attr("selected", "selected");
                $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
            }
            else if(getParent == "filter-address")
            {
                $('.location-form .service-form-combine input').val('');
                $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
            }
            else if(getParent == "filter-title")
            {
                $('.location-form .service-form-keyword input').val('');
                $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
            }
        });


        //search-icon
        $('.title-search', context).once('interior_health_theme').on('click',function () {
            $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
        });
        // $('.current-location', context).once('interior_health_theme').on('click',function () {
        //     // $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
        //     var user_address = sessionStorage.getItem("user_address");
        //     if (typeof user_address != 'undefined' || user_address != null || user_address != '') {
        //       $('.service-form-combine input').val(user_address);
        //       $(".service-form-distance select").prop("disabled", false);
        //       $(".service-form-address").siblings(".form-actions").find("input[value='Search Services']").trigger('click');
        //       $(".service-form-address").siblings(".form-actions").find("input[value='Apply']").trigger('click');
        //     }
        //     else {
        //       if (!$(".current-location-text").hasClass('hidden')) {
        //         $(".current-location-text").addClass("hidden");
        //       }
        //       $(".service-form-distance select").prop("disabled", true);
        //     }
        // });

        $('.select-arrow', context).once('interior_health_theme').on('click',function () {
            $(this).parents('.form-type-select').find('select').trigger('click');
        });

        // grid length
        $('.results-title + .view-service-listing-page').each(function(){
            var gridLimit = $(this).find('.total-rows-count').html();
            if( gridLimit > 3){   
                $(this).find('.view-footer').removeClass('d-none');  
            }
            else {
                $(this).find('.view-footer').addClass('d-none'); 
            }
        });
        // show more
        // $('.view-footer .show-all .ih-link').on('click',function () {
        //     if(!$(this).hasClass('less')){   
        //         $(this).text('Show Less Locations').addClass('less');  
        //     }else{
        //         $(this).text('Show All Locations').removeClass('less'); 
        //     }
        //     $(this).parents('.view-footer').siblings('.result-items').find('.result-item.toggleable').slideToggle('');
        // });

        //Clear all
        $('.view-results-filter .clear-all', context).once('interior_health_theme').on('click',function () {
            $('.top-banner-wrapper .location-form .form-submit:not(.yellow-btn)').trigger('click');
        });
        $('.filter-text-close', context).once('interior_health_theme').on('click',function () {
            $('.top-banner-wrapper .location-form .form-submit:not(.yellow-btn)').trigger('click');
        });



        

        //distance
        $('.service-form-distance .custom-option', context).once('interior_health_theme2').on('click',function () {
            var distance = $(this).attr("data-value");
            $('.service-form-address input[type="number"]').val(distance);
        });
        var selected_distance = $('.service-form-address input[type="number"]').val();
        //sort by
        // $('.sort-by .ih_drop_down .custom-option', context).once('interior_health_theme').on('click',function () {
        // var value = $('.sort-by .ih_drop_down .custom-option.selected').attr("data-value");
        // $('.form-item-sort-by option[value="'+value+'"]').attr("selected", true);
        // $('.form-item-sort-by option[value="'+value+'"]').prop("selected", true);
        // $('.form-item-sort-by option[value="'+value+'"]').siblings().attr("selected", false);
        // $('.form-item-sort-by option[value="'+value+'"]').siblings().prop("selected", false);
    
        //     $('.top-banner-wrapper .location-form .yellow-btn').trigger('click');
        // });
        // var reverse_value = $('.form-item-sort-by option:selected').text();
        // $('.sort-by .ih_drop_down .select__trigger span').text(reverse_value);
        // $('.sort-by .ih_drop_down .custom-option').eq($('.form-item-sort-by option:selected').index()).addClass("selected");
        // $('.sort-by .ih_drop_down .custom-option').eq(!$('.form-item-sort-by option:selected').index()).removeClass("selected");

        // if($(".view-service-listing-page .view-results-filter .filter-category h4, .view-location-listing-page .view-results-filter .filter-category h4 ").text() === "All") {
        //     $(".view-service-listing-page .view-results-filter, .view-location-listing-page .view-results-filter ").hide();
        // }
        //sort by
        $('.sort-by select', context).once('interior_health_theme').on('click',function () {
            $(this).parents('.sort-by').toggleClass("arrow-rotate");
        });

        $('.location-sort-by .sort-by .custom-option', context).once('interior_health_theme').on('click', function () {
            var ih_value = $(this).attr('data-value');
            $(this).attr("selected", true).siblings().removeAttr('selected');
            $(this).prop("selected", true);
            $('.location-form .form-item-sort-bef-combine .form-select option[value="' + ih_value + '"]').attr("selected", true).siblings().removeAttr('selected');
            $('.location-form .form-item-sort-bef-combine .form-select option[value="' + ih_value + '"]').prop("selected", true);
            $('.location-form .form-actions .form-submit.yellow-btn').trigger('click');
        });
        var sort_selected = $('.location-form .form-item-sort-bef-combine .form-select option:selected').attr('value');
        $('.location-sort-by .sort-by .custom-option[data-value="' + sort_selected + '"]').addClass('selected').siblings().removeClass('selected');
        var sort_selected_text = $('.location-sort-by .sort-by .custom-option[data-value="' + sort_selected + '"]').html();
        $('.location-sort-by .sort-by .select__trigger span').text(sort_selected_text);

    }
};

(function ($) {
	Drupal.behaviors.interior_health_theme = {
        attach: function (context) {
           serviceListingPage.serviceListingScript(context);
        }
    }
})(jQuery);