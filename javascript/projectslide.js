var slideIndex = 1;
showDivs(slideIndex, 'friendly-slides', 'demo');
showDivs(slideIndex, 'vizly-slides', 'demo1');

function plusDivs(n, imageClass, dotClass) {
  showDivs(slideIndex += n, imageClass, dotClass);
}

function currentDiv(n, imageClass, dotClass) {
  showDivs(slideIndex = n, imageClass, dotClass);
}

function showDivs(n, imageClass, dotClass) {
  var i;
  var x = document.getElementsByClassName(imageClass);
  var dots = document.getElementsByClassName(dotClass);
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}