$('document').ready(function(){
  

  //detect mobile or computer click
  if ('ontouchstart' in document.documentElement) {
    var touchClick = 'touchstart';
  }else{
    var touchClick = 'click';
  }


  //Header Style Toggle
  $(window).scroll(function(){
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();

    if (scroll >= 10) {
      sticky.addClass('fixed');

    } else {
      sticky.removeClass('fixed');
    }
  });



});