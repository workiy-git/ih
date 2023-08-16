$(document).ready(function () {
  //alert("test");
  // $('.accordian-items .acc-title:first-child').toggleClass('active');
  // $('.accordian-items .acc-title:first-child + .acc-content').slideToggle();
  var hash = window.location.hash;
  //alert(hash);
  if(hash!=''){ 
    $(hash).find('.acc-title').toggleClass("active");
    $(hash).find('.acc-content').css("display", "block");
  }
  
  $(".accordian-items .acc-title").on("click", function () {
    var id_name=$(this).parent().parent().attr('id');
    //alert(id_name);
    //var url = document.location.href+"#"+id_name;
    //document.location = url;
    var url1  = window.location.pathname; 
    window.history.pushState(url1, "", "#"+id_name);
    //alert(this);
    //$(this).slideToggle;
    //$(this).toggleClass("active");
    //$(this).next(".acc-content").slideToggle();
  });

  
});