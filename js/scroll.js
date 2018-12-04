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

$(document).ready(function () {
    //Disable full page
    $("body").on("contextmenu",function(e){
        return false;
    });

    $('body').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
});