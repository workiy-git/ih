var $ = jQuery;
var ihForm = ihForm || {};
ihForm = {
  inhFormInputValidation: function () {
    $(".ih-form textarea")
      .focus(function () {
        $(this).parents(".form-item").addClass("floating-label");
      })
      .blur(function () {
        $(this).parents(".form-item").removeClass("floating-label");
      });

      $(".ih-form .form-item input, .ih-form .form-item textarea, .ih-form .form-item select").blur(
        function () {
          if ($(this).val().length > 0) {
            $(this).parents(".form-item").addClass("floating-label");
          }
          if ($(this).val().length == 0) {
            $(this).parents(".form-item").removeClass("floating-label");
          }
        }
      );

      $(".ih-form .info").click(function () {
        $(this).siblings().show();
      });

      $(".ih-form .close").click(function () {
        $(this).hide();
        $(this).siblings("strong").hide();
      });
  },
  inhFormAjaxInputValidation: function () {
    $(".ih-form .form-item input, .ih-form .form-item textarea, .ih-form .form-item select").each(function () {
      if ($(this).val().length > 0) {
        $(this).parents(".form-item").addClass("floating-label");
      }
      if ($(this).val().length == 0) {
        $(this).parents(".form-item").removeClass("floating-label");
      }
    });
  }
};
$(document).ready(function () {
  ihForm.inhFormInputValidation();
});
$(document).ajaxComplete(function () {
  ihForm.inhFormInputValidation();
  ihForm.inhFormAjaxInputValidation();
});
