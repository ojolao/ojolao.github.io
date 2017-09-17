$(function(){
  var sections = [$('#home'), $('#me'), $('#projects'), $('#contact')];

  var scrollChange = function () {
    var scroll = $(document).scrollTop();
    var offsetScroll = scroll + 3*$('.navbar').outerHeight(); // just below header
    chooseSelected(offsetScroll)
  }

  var chooseSelected = function (y) {
    for(var i = sections.length - 2; i >= 0; i--) {
      if ( y >= sections[i].offset().top) {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          changeSelected(3);
        } else {
          changeSelected(i);
          return;
        }
      }
    }
  };

  var changeSelected = function (idx) {
    for (var i = 0; i < sections.length; i++) {
      var selector = '.navbar a:nth-child('+(1+i)+')';
      i === idx ? $(selector).addClass('selected ') : $(selector).removeClass('selected');
    }
  }

  $(document).scroll(scrollChange);
  $(scrollChange);
});
