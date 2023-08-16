var $ = jQuery;
var feedbackSideBar = feedbackSideBar || {};
feedbackSideBar = {
    feedbackSideBarShow: function() {
        $(".feedback").on("click", function() {
            $(".feedback-form").addClass("show");
            $(".bg-overlay").show();
            $("body").css("overflow", "hidden");
        });
    },
    feedbackSideBarHide: function() {
        $(".feedbacktitle-wrapper button").on("click", function() {
            $(this).parents(".feedback-form").removeClass("show");
            $(".bg-overlay").hide();
            $("body").css("overflow", "auto");
        });

        $( ".bg-overlay" ).on( "click", function() {
            $( ".feedbacktitle-wrapper button" ).trigger( "click" );
        });
    },
    feedbackSideBarForm: function() {
        $(".ih-form .feedbacktitle-wrapper button").click(function () {
            if($(".webform-submission-feedback-form-add-form .webform-confirmation .back-link").length > 0){
            $("a.back-link").trigger("click");
            }
        });
    }
};
$(document).ready(function() {
    feedbackSideBar.feedbackSideBarShow();
    feedbackSideBar.feedbackSideBarHide();
    feedbackSideBar.feedbackSideBarForm();
});
$(document).ajaxComplete(function() {
    feedbackSideBar.feedbackSideBarShow();
    feedbackSideBar.feedbackSideBarHide();
    feedbackSideBar.feedbackSideBarForm();
});