// const signUpButton=document.getElementById('signUpButton');
// const signInButton=document.getElementById('signInButton');
// const signInForm=document.getElementById('signIn');
// const signUpForm=document.getElementById('signup');

// signUpButton.addEventListener('click',function(){
//     signInForm.style.display="none";
//     signUpForm.style.display="block";
// })
// signInButton.addEventListener('click', function(){
//     signInForm.style.display="block";
//     signUpForm.style.display="none";
// })

// function closePage() 
// {
//     window.location.href = "index.html";
// }

const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const container = document.querySelector(".container");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");

// Switch to Sign Up Mode
signUpButton.addEventListener("click", function () {
    container.classList.add("sign-up-mode");
    signInForm.style.display = "none";
    // signUpForm.style.display = "block";
});

// Switch to Sign In Mode
signInButton.addEventListener("click", function () {
    container.classList.remove("sign-up-mode");
    // signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// Return to Homepage
function closePage() {
    window.location.href = "index.html";
}
