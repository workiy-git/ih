var $ = jQuery;
var menuToggleEvent = menuToggleEvent || {};
menuToggleEvent = {
    // Function for Menu toggle control
    toggler: function (context) {
        $(".menu-toggle + .drop-arrow", context).once('interior_health_menu').on('click', function () {
            $(this).siblings(".menu-level-two").toggleClass("show");
            $("body").css("overflow", "hidden");
            $(".bg-overlay").show();
        });
        $(".menu-item-toggle-five + .arrow", context).once('interior_health_menu').on('click', function () {
            $(this).siblings(".menu-level-six").toggleClass("show");
        });
        $(".menu-item-toggle-four + .arrow", context).once('interior_health_menu').on('click', function () {
            $(this).siblings(".menu-level-five").toggleClass("show");
        });
        $(".menu-item-toggle-three + .arrow", context).once('interior_health_menu').on('click', function () {
            $(this).siblings(".menu-level-four").toggleClass("show");
        });

        $(".menu-item-toggle + .arrow", context).once('interior_health_menu').on('click', function () {
            $(this).siblings(".menu-level-three").toggleClass("show");
        });

        $(".previous-menu", context).once('interior_health_menu').on('click', function () {
            if ($(".menu-level-six").hasClass("show")) {
                $(".menu-level-six").removeClass("show");
            }
            else if ($(".menu-level-five").hasClass("show")) {
                $(".menu-level-five").removeClass("show");
            }
            else if ($(".menu-level-four").hasClass("show")) {
                $(".menu-level-four").removeClass("show");
            }
            else {
                $(this).parents(".menu-level-three").toggleClass("show");
            }
        });
        $(".close-menu", context).once('interior_health_menu').on('click', function () {
            $(this).parents(".menu-level-two").toggleClass("show");
            $(this).parents(".menu-level-three").toggleClass("show");
            $(this).parents(".menu-level-four").toggleClass("show");
            $(this).parents(".menu-level-five").toggleClass("show");
            $(this).parents(".menu-level-six").toggleClass("show");
            $(this).parents(".mobile-menu").toggleClass("show");
            $("body").css("overflow", "auto");
            $(".bg-overlay").hide();
        });
    },
    // Adding Arrow button to the Secondary Menu
    buttonAdder: function () {
        if ($(".menu-toggle + .drop-arrow ").length === 0) {
            $(".menu-item .menu-level-two").before(`<Button class='drop-arrow' aria-label='drop-arrow'></Button>`);
        }
        if ($(".menu-item-toggle + .arrow").length === 0) {
            $(".menu-level-two .menu-item-toggle").after(`<Button class='arrow' aria-label='arrow'></Button>`);
        }
    },
    // Adding Wrapper for Internal Scroll
    wrapper: function () {
        $(".menu-level-two").each(function () {
            $(this).children("li").wrapAll("<ul class='menu-item-wrapper level-one'></ul>");
        });
        $(".menu-level-three").each(function () {
            $(this).children("li").wrapAll("<ul class='menu-item-wrapper level-two'></ul>");
        });
        $(".menu-level-four").each(function () {
            $(this).children("li").wrapAll("<ul class='menu-item-wrapper level-three'></ul>");
        });
        $(".menu-level-five").each(function () {
            $(this).children("li").wrapAll("<ul class='menu-item-wrapper level-four'></ul>");
        });
        $(".menu-level-six").each(function () {
            $(this).children("li").wrapAll("<ul class='menu-item-wrapper level-five'></ul>");
        });
    },
    // Adding Wrapper for Title Dynamically
    menuTitle: function (context) {
        $(".menu-toggle + .drop-arrow").on('click', function () {
            var currentElement = $(this).siblings(".menu-toggle").text();
            if ($(this).siblings(".menu-level-two").children(".level-one").find(".menu-title").length == 0) {
                $(this).siblings(".menu-level-two").children(".level-one").prepend("<li class='menu-item menu-title'> " + currentElement + " </li>");
            }
        });
        $(".menu-item-toggle + .arrow").on('click', function () {
            var secondCurrentElement = $(this).siblings(".menu-item-toggle").text();
            if ($(this).siblings(".menu-level-three").children(".level-two").find(".menu-title").length == 0) {
                $(this).siblings(".menu-level-three").children(".level-two").prepend("<li class='menu-item menu-title'> " + secondCurrentElement + " </li>");
            }
            var thirdCurrentElement = $(this).siblings(".menu-item-toggle").text();
            if ($(this).siblings(".menu-level-four").children(".level-three").find(".menu-title").length == 0) {
                $(this).siblings(".menu-level-four").children(".level-three").prepend("<li class='menu-item menu-title'> " + thirdCurrentElement + " </li>");
            }
            var fourthCurrentElement = $(this).siblings(".menu-item-toggle").text();
            if ($(this).siblings(".menu-level-five").children(".level-four").find(".menu-title").length == 0) {
                $(this).siblings(".menu-level-five").children(".level-four").prepend("<li class='menu-item menu-title'> " + fourthCurrentElement + " </li>");
            }
            var fifthCurrentElement = $(this).siblings(".menu-item-toggle").text();
            if ($(this).siblings(".menu-level-six").children(".level-five").find(".menu-title").length == 0) {
                $(this).siblings(".menu-level-six").children(".level-five").prepend("<li class='menu-item menu-title'> " + fifthCurrentElement + " </li>");
            }
        });
    },
    // Moblie Device Navigation Building
    mobileMenubuilder: function (context) {
        if ($(window).width() < 992) {
            var headerSize = $(".site-header").height();
            $(window).scroll(function () {
                var moblieHeaderSticky = $(window).scrollTop();
                if (moblieHeaderSticky > headerSize) { $(".global-search-header").addClass("sticky"); }
                else { $(".global-search-header").removeClass("sticky"); }
            });

            $("#block-interior-health-theme-branding").insertBefore(".global-search");
            if ($(".global-search").siblings("#hamburger").length == 0) {
                $(".global-search").append(`<Button id='hamburger' aria-label='hamburger'></Button>`);
            }
            if ($(".global-search-header").siblings(".mobile-menu").length == 0) {
                $(".global-search-header").after(`<div class="mobile-menu"></div>`);
                $(".mobile-menu").after(`<div class="mobile-navigation"></div>`);
            }
            if ($("#hamburger").length == 1) {
                $("#hamburger").on("click", function () {
                    $(".mobile-menu").toggleClass("show");
                    $(".bg-overlay").show();
                    $("body").css("overflow", "hidden");
                });
            }
            const sercivesMenu = $(".interior-health-main-menu .service-list").clone();
            const stickySercivesMenu = $(".interior-health-main-menu .service-list").clone();
            const mainMenu = $(".menu--main").clone();
            const carrersMenu = $(".first-menu-block").clone();
            const contactMenu = $(".middle-menu-block.primary-dark").clone();
            const completeMoblieMenu = sercivesMenu.add(mainMenu).add(carrersMenu).add(contactMenu);
            $(".mobile-menu").html(completeMoblieMenu);
            $(".mobile-navigation").html(stickySercivesMenu);
            $(".mobile-menu .service-list, .mobile-menu #block-interior-health-theme-main-menu, .mobile-menu .first-menu-block").wrapAll("<div class='primary-nav'></div>");
            $(".mobile-menu").prepend(`<div class="menu-header"><span>Menu</span><button class="close-menu" aria-label='close-menu'></button></div>`);
            $(".global-search-header .first-menu-block").remove();
            $(".global-search-header .middle-menu-block.primary-dark").remove();
            $(".interior-health-main-menu").remove();
        }
    },
    // Overlay Menu close
    overlayMenuHide: function (context) {
        $(".bg-overlay", context).once('interior_health_menu').on('click', function () {
            $("body .menu-level-three, body .menu-level-two").removeClass("show");
        });
        // desktop sticky header
        if ($(window).width() > 991) {
            var stickyOffset = $('main').offset().top;
            $(window).scroll(function () {
                var sticky = $('.site-header'),
                    scroll = $(window).scrollTop();

                if (scroll >= stickyOffset) sticky.addClass('fixed');
                else sticky.removeClass('fixed');
            });
        };
    },
    // service Positioning based on Caution Banner
    serviceItems: function () {
        if ($(".alter-banner").is(":visible")) {
            $(".service-list").addClass("page-with-caution-bannner");
        }
    },

    globalSearch: function (context) {
        $('.global-search .search', context).once('interior_health_menu').on('click', function () {
            $('.global-search-modal-wrapper').addClass('show');
            if ($('.global-search-modal-wrapper').length) {
                $('body').addClass('search-popup');
            }

            var home_search = '';
            $('.global-search-filter .form-item-search-api-fulltext input').val(home_search);

            var home_search_filter = 'All'
            $('.global-search-filter .form-select option[value="' + home_search_filter + '"]').attr("selected", true);
            $('.global-search-filter .form-select option[value="' + home_search_filter + '"]').prop("selected", true);

            if (home_search_filter == 'All') {
                home_search_filter = 'all'
            }
            $('.global-search-filter .custom-option.' + home_search_filter).trigger('click');
            //$('.global-search-filter .form-actions input').trigger('click');

        });

        $('.global-search-modal-header .close-btn').click(function () {
            $('.global-search-modal-wrapper').removeClass('show');
            $('body').removeClass('search-popup');
        });


       



        $(".ih_drop_down").each(function () {
            $(this, context).once('interior_health_menu').on('click', function () {
                $(this).find('.select').toggleClass('open');
            });
            if ($(this).hasClass("search_dd")) {
                $(this).find(".custom-option").each(function () {
                    $(this, context).once('interior_health_menu').on('click', function () {
                        if (!this.classList.contains('selected')) {
                            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                            this.classList.add('selected');
                            var ih_class = $(this).attr('data-value');
                            //var ih_class = $(this).attr('class').replace("custom-option", "").replace("gsd", "").replace("selected", "").split(" ").join("");
                            this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
                            $(this).parents('.select').find('.select__trigger span').removeClass();
                            this.closest('.select').querySelector('.select__trigger span').classList.add(ih_class);
                            if (ih_class == 'all') {
                                ih_class = 'All'
                            }
                            $('.ih-search-form-wrapper .form-select option[value="' + ih_class + '"]').attr("selected", true).siblings().removeAttr('selected');
                            $('.ih-search-form-wrapper .form-select option[value="' + ih_class + '"]').prop("selected", true);
                        }
                    });
                });
            } else {
                $(this).find(".custom-option").each(function () {

                    if ($(this).hasClass("selected")) {
                        var selected_data = $(this).text();
                        this.closest('.select').querySelector('.select__trigger span').textContent = selected_data;
                    }

                    $(this, context).once('interior_health_menu').on('click', function () {
                        if (!this.classList.contains('selected')) {
                            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                            this.classList.add('selected');
                            this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
                            $(this).parentsUntil('ih_drop_down').siblings("select").find('option').eq($(this).index()).attr("selected", true);
                            $(this).parentsUntil('ih_drop_down').siblings("select").find('option').not().eq($(this).index()).removeAttr("selected", true);
                            $(this).parentsUntil('ih_drop_down').siblings("select").find('option').eq($(this).index()).prop("selected", true);
                            $(this).parentsUntil('ih_drop_down').siblings("select").find('option').not().eq($(this).index()).removeProp("selected", true);
                        }
                    });
                });
            }
        });
        if ($('body').hasClass("path-search")) {
            var search_cetegory = $('.search-page-filter-form .form-type-select option:selected').attr('value');
            $('.search-page-filter-form .form-type-select span[data-value="' + search_cetegory + '"]').trigger('click');
            $('.select__trigger span').attr("class", search_cetegory);
        }
        $(window).on('click', function (e) {
            for (const select of document.querySelectorAll('.select')) {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            }
        });
        $(document).ready(function (e) {
            for (const select of document.querySelectorAll('.select')) {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            }
        });
        // });
    },

    anchorTag: function (context) {
        // Add attr:target for all external and internal pdf <a> tag
        $("a").each(function () {
            var href = $(this).prop('href');
            var attr = $(this).attr('target');
            // Check already attr is present
            if ((typeof attr === 'undefined') || (attr === false)) {
                var comp = new RegExp(location.host);
                // external link
                if (!comp.test(href)) {
                    // console.log(comp.test(href));
                    $(this).attr('target', '_blank');
                }
                // pdf document
                if (href.indexOf(".pdf") != -1) {
                    $(this).attr('target', '_blank');
                }
            }
        });
    },

    adminMenu: function () {
        if ($('html').find('body').hasClass('toolbar-fixed')) {
            $('html').css({ "scroll-padding-top": "180px" });
        }
    },

    globalAccordian: function (context) {
        $(".accordian-items .acc-title", context).once('interior_health_menu').on('click', function () {
            $(this).toggleClass("active");
            $(this).next(".acc-content").slideToggle();
        })
    }


    // feedBack: function(context) {
    //     $('.ui-dialog .webform-submission-form').each(function(){
    //         if($('.webform-submission-form').hasClass('ui-dialog-feedback'))
    //         {
    //             $(this).parents('.ui-dialog').addClass('ui-feedback-wrapper ih-form');
    //         }
    //     });
    // }
};
// content page related js
$(".block-addtoany-block").hover(function () {
    $(".addtoany_list ").toggleClass("active");  //Toggle the active class to the area is hovered
});

if ($(window).width() < 992) {
    $(".block-addtoany-block").insertBefore(".content-banner .top-banner-header-content h1 ");
}

$(".content-page-content-section p").each(function () {
    if (($(this).text().trim() == '&nbsp;' || $(this).text().trim() === '') && $(this).children().length == 0) {
        $(this).hide();
    }
});

 //resource slider
var sliderLength = $('.resource-slider .resource-tile').length;
if(sliderLength == 1)
{
    $('.resource-slider').addClass('single-child');
}


//migrate accordion
$('.advgb-accordion-wrapper .advgb-accordion-item:first-child .advgb-accordion-header-title').toggleClass('active');
$('.advgb-accordion-wrapper .advgb-accordion-item:first-child .advgb-accordion-header + .advgb-accordion-body').slideToggle();
$(".advgb-accordion-wrapper .advgb-accordion-header").on("click", function () {
    $(this).children('.advgb-accordion-header-title').toggleClass("active");
    $(this).next(".advgb-accordion-body").slideToggle();
});

// $('.content-page-content-section table').basictable({
//     breakpoint: 768
// });

(function () {
    Drupal.behaviors.interior_health_menu = {
        attach: function (context) {
            menuToggleEvent.wrapper(context);
            menuToggleEvent.buttonAdder(context);
            menuToggleEvent.toggler(context);
            menuToggleEvent.menuTitle(context);
            menuToggleEvent.overlayMenuHide(context);
            menuToggleEvent.serviceItems(context);
            menuToggleEvent.globalSearch(context);
            menuToggleEvent.anchorTag(context);
            menuToggleEvent.adminMenu(context);
            menuToggleEvent.globalAccordian(context);
            // menuToggleEvent.feedBack(context);
        }
    }
})(jQuery);

menuToggleEvent.mobileMenubuilder();


// setTimeout(myTimer, 5000);

// function myTimer() {
//   let userAgentString = navigator.userAgent;
//     let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;
//     if(IExplorerAgent)
//         alert('"This browser is not supported!"');

//     let chromeAgent = userAgentString.indexOf("Chrome") > -1;
//     if(chromeAgent)
//         alert('"This browser is not supported!"');
// }

// setTimeout(function(event) {
//     // Internet Explorer 6-11
//     var isIE = /*@cc_on!@*/false || !!document.documentMode;
//     if(isIE)
//     {
//        alert('"This browser is not supported!"');
//     }
// }, 5000);