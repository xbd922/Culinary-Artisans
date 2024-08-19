const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const container = document.querySelector(".container");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");

// Switch to Sign Up Mode
signUpButton.addEventListener("click", function () {
    container.classList.add("sign-up-mode");
});

// Switch to Sign In Mode
signInButton.addEventListener("click", function () {
    container.classList.remove("sign-up-mode");
});

// Return to Homepage
function backToHome() {
    window.location.href = "index.html";
}
