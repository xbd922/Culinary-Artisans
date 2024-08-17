$(document).ready(function(){
    $(".recipe-image").owlCarousel({
        loop: true, // Infinite loop
        margin: 10, 
        autoplay: true, 
        autoplayTimeout: 3000, 
        autoplayHoverPause: true, // Pause when hover
        nav:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1200:{
                items:3,
            },
        }
        
    });
});

$(document).ready(function(){
    $(".cooking-tips").owlCarousel({
        loop: true, // Infinite loop
        margin: 10, 
        autoplay: true, 
        autoplayTimeout: 3000, 
        items:1
    });
});