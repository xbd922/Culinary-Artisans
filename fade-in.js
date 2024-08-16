$(function(){ 
    $('.fade').fadeIn('fast');
  });
  $(document).ready(function() {
      $(window).scroll( function(){
          /* Check the location of each desired element */
          $('.fade').each( function(i){
              var bottom_of_object = $(this).position().top + $(this).outerHeight();
              var bottom_of_window = $(window).scrollTop() + $(window).height();
              
            /*Fade in object */
            if( bottom_of_window > bottom_of_object){  
                $(this).animate({'opacity':'1'},1000);
              }
          }); 
      });
  });