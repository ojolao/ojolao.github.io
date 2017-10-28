const smoothScroll = (target) => {
  let scrollContainer = target;
  do { // find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop === 0);

  var targetY = 0;
  do { // find the top of target relatively to the container
    if (target === scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);

  const scroll = (c, a, b, i) => {
    i++; if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(() => { scroll(c, a, b, i); }, 20);
  };
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};

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
