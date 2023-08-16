var $ = jQuery;
var signUpPopup = signUpPopup || {};
signUpPopup = {
    signUpPopupShow: function() {
        const popupClosed = sessionStorage.getItem('signUpPopupClosed');
        if (!popupClosed) {
            // setTimeout(function() {
            $(window).one("scroll", function() {
                $(".signup-wrapper").show();
                $(".bg-overlay").show();
                $("body").css("overflow", "hidden");
                $(".alert-overlay.show , .feedback-form.show, .menu-level-two.show, .menu-level-three.show").each(function() {
                    $(this).removeClass("show");
                });
                $("body").addClass("signUpOpened");
            // }, 2000);
            });
        }
    },
    signUpPopupHide: function() {
        $(".signup-close").on("click", function() {
            $(this).parents(".signup-wrapper").hide();
            $(".bg-overlay").hide();
            $("body").css("overflow", "auto");
            $("body").css("pointer-events", "auto");
            $("body").removeClass("signUpOpened");
            // sessionStorage.setItem('signUpPopupClosed', 'True');
            sessionStorage.setItem('signUpPopupClosed', 'True');
        });
    },
    overLayClose: function() {
        $(".bg-overlay").on("click", function() {
            $(".signup-close").trigger('click');
        });
    }
};
$(document).ready(function() {
    signUpPopup.signUpPopupShow();
    signUpPopup.signUpPopupHide();
    signUpPopup.overLayClose();
});