
var ihWebForm = ihWebForm || {};
ihWebForm = {
ihWebFormInputValidation: function (context) {
    //open add
    $(".ih-webform .info").on('click',function()
    {
        $(this).siblings().show();
    });

    $(".ih-webform .close").on('click',function()
    {
        $(this).hide();
        $(this).siblings("strong").hide();
    });
    if($(window).width() > 991){
        $('details').attr('open', '');
    }

    if($(window).width() < 991){
        $('.webform-table').parents(".details-wrapper").addClass("mobile-scroller");
    }
    //with value class add
    $(".ih-webform .form-item:not(.form-type-date) input, .ih-webform .form-item select").each(function() { 
        if(!$(this).val() == 0){
            $(this).parent("div").addClass("with-value");
        }
    });
    //with value on focus class add
    $(".ih-webform .form-item:not(.form-type-date) input, .ih-webform .form-item select").focus(function() {
        $(this).parent("div").addClass("with-value");
    });
    //with value on focus out class add
    $(".ih-webform .form-item:not(.form-type-date) input, .ih-webform .form-item select").focusout(function() {
        if(!$(this).val() == 0){
            $(this).parent("div").addClass("with-value");
        }
        else
        {
            $(this).parent("div").removeClass("with-value");
        }
    });

    $(".ih-webform .form-type-date").each(function() {
        $(this).addClass("with-value");
        if($(this).children('input').val().length == 0) {
            $(this).children("input").attr("placeholder", "mm/dd/yyyy");    
        }
    });
    
    $("#edit-date-of-birth").on("change", function() {

        var userinput = document.getElementById("edit-date-of-birth").value;

        var dob = new Date(userinput);
    
        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();
    
        //convert the calculated difference in date format
        var age_dt = new Date(month_diff);
    
        //extract year from date
        var year = age_dt.getUTCFullYear();
    
        //now calculate the age of the user
        var age = Math.abs(year - 1970);
        document.getElementById("edit-age-").value = age;
        $("#edit-age-").parents(".form-item").addClass("with-value");
    });

    //physician table
    $('.physician-msp-wrapper tbody label').removeClass('visually-hidden');


    //pacific time zone to other timezone calculation
    $("#edit-start-time-").on("change", function() {

        var time = document.getElementById("edit-start-time-").value;

        timeParts = time.split(':');
    
        Mountain = parseInt(timeParts[0]) + 1;
    
        Central = parseInt(timeParts[0]) + 2;
    
        Eastern = parseInt(timeParts[0]) + 3;
    
        mountain = "Mountain:" + " " + Mountain + ":" + timeParts[1];
    
        central = "Central:" + " " + Central + ":" + timeParts[1];
    
        eastern = "Eastern:" + " " + Eastern + ":" + timeParts[1];
    
        mce = mountain + " " + central + " " + eastern ;
    
        document.getElementById("edit-start-time-equivalent-in-other-time-zones-").value = mce;
        $("#edit-start-time-equivalent-in-other-time-zones-").parents(".form-item").addClass("with-value");
    });

    $('.page-node-type-webform textarea').on('input', function() { 
        $(this).height(this.scrollHeight - 30);
    });

    $(document).ajaxComplete(function () {
        $('.page-node-type-webform textarea').each(function() { 
            $(this).height(this.scrollHeight - 30);
        });
        //physician table
        $('.physician-msp-wrapper tbody label').removeClass('visually-hidden');
    });

    if($('div[data-drupal-messages] .messages').hasClass('messages--error'))
    {
        $('.ih-webform .webform-submission-form').addClass('padding-60');
    }
}};



(function ($) {
	Drupal.behaviors.interior_health_form = {
        attach: function (context) {
            ihWebForm.ihWebFormInputValidation(context);
        }
    }

    $(document).ready(function () {
        $('.telephone-number').on('input', function (event) { 
            this.value = this.value.replace(/[^0-9\+\-]/g, '');
        });
        $('.clinic-phone').on('input', function (event) { 
            this.value = this.value.replace(/[^0-9\-\.]/g, '');
        });
        $('.clinic-fax').on('input', function (event) { 
            this.value = this.value.replace(/[^0-9\-\.]/g, '');
        });
        $('.clinic-phone').on('input', function (event) { 
            $(this).val($(this).val().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
        });
        $('.clinic-fax').on('input', function (event) { 
            $(this).val($(this).val().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
        });
        $('.clinic-postal-code').on('keydown',function(e) {
            var x = e.which || e.keycode;
            console.log(x);
            if (x == 8 || x == 46){
                return true;
            }
            $(this).val($(this).val().toUpperCase().replace(/\W/g,'').replace(/(...)/,'$1 '));
        });
    });
})(jQuery);


