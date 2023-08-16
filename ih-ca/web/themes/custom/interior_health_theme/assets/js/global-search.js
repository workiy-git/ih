(function ($) {
  Drupal.behaviors.interior_health_global_search = {
    attach: function (context) {
        
      var recent_search = localStorage.getItem("recent_search");
      if (recent_search === 'undefined' || recent_search === null) {
        if (!$(".recent-search-wrapper").hasClass('hidden')) {
          $(".recent-search-wrapper").addClass("hidden");
        }
      }
      else {
        $(".recent-search-wrapper span").remove();
        var recentSearch = JSON.parse(localStorage.getItem("recent_search"));
        var count = recentSearch.length > 7 ? 7 : recentSearch.length;
        var i;
        for (i = 0; i <= count; i++) {
          if ((typeof recentSearch[i] !== 'undefined') && (recentSearch[i] !== null)) {
            $(".recent-search-wrapper").append( "<span>" + recentSearch[i] + "</span>" );
          }
        }
        if ($(".recent-search-wrapper").hasClass('hidden')) {
          $(".recent-search-wrapper").removeClass("hidden");
        }
      }

      $(".home-search-block .block-views-exposed-filter-blockglobal-search-page-1 .form-actions input[value='Search']", context).once('interior_health_global_search2').on('click',function () {
        var text = $(this).parent('.form-actions').siblings('.form-item-search-api-fulltext').find('input').val();
        saveRecentSearch(text);
      });

      $(".home-search-block .block-views-exposed-filter-blockglobal-search-page-1 input[name='search_api_fulltext']").on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13){
          var text = $(this).parent('.form-actions').siblings('.form-item-search-api-fulltext').find('input').val();
          saveRecentSearch(text);
        }
      });

      $(".global-search-filter .block-views-exposed-filter-blockglobal-search-page-1 .form-actions input[value='Search']", context).once('interior_health_global_search2').on('click',function () {
        var text = $(this).parent('.form-actions').siblings('.form-item-search-api-fulltext').find('input').val();
        saveRecentSearch(text);
      });

      $(".global-search-filter .block-views-exposed-filter-blockglobal-search-page-1 input[name='search_api_fulltext']").on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13){
          var text = $(this).parent('.form-actions').siblings('.form-item-search-api-fulltext').find('input').val();
          saveRecentSearch(text);
        }
      });
    }
  }

  function saveRecentSearch (text) {
    // console.log(text);
    if ((typeof text != 'undefined') && (text != null) && (text != '')) {
      var search_keywords = localStorage.getItem("recent_search");
      if (typeof search_keywords === 'undefined' || search_keywords === null) {
        var recent_search2 = [];
        recent_search2[0] = text;
        localStorage.setItem("recent_search", JSON.stringify(recent_search2));
      }
      else {
        var recentSearch3 = JSON.parse(search_keywords);
        var i;
        var flag = 1;
        for (i = 0; i < recentSearch3.length; i++) {
          if (text == recentSearch3[i]) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          recentSearch3.unshift(text);
        }
        localStorage.setItem("recent_search", JSON.stringify(recentSearch3));
      }
    }
  }

})(jQuery);

$(document).ready(function ($) {    
  // Recent search term click action
  $('.recent-search-wrapper span').on('click',function () {
    $('.global-search-filter .form-item-search-api-fulltext input').val($(this).html());
    $('.global-search-modal-wrapper .form-actions input[value="Search"]').trigger("click");
  });

  //content hub slide single
  setTimeout(function() {
    var hubCount = $('.hub-items-wrapper .slick-track .slick-slide').length;
    if(hubCount == 1)
    {
      $('.hub-items-wrapper').addClass('hubsingle');
    }
  }, 1000);
});

$(document).ajaxComplete(function() {
  // Recent search term click action
  $('.recent-search-wrapper span').on('click',function () {
    $('.global-search-filter .form-item-search-api-fulltext input').val($(this).html());
    $('.global-search-modal-wrapper .form-actions input[value="Search"]').trigger("click");
  });
});