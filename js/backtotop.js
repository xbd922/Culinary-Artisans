let back = document.getElementById("Btn");

window.onscroll = function(){scrolldown()};   

function scrolldown(){
    if(document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        back.style.display = "block";
    }
    else{
        back.style.display = "none";
    }
}

function backtotop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}