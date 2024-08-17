//To setCookie
function setCookie(name,value,days){
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log(`Cookie set: ${name} = ${value}`);//To confirm the function run properly
}

//To getCookie
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
    
    return "";
}

//To load profile pciture
function loadProfilePicture() {
    const img = localStorage.getItem("profilePicture");
    const imgElement = document.getElementById('pfp');
    //Here use localStorage because COOKIE cannot run..
   if(img){
    imgElement.src = img;
    console.log("User picture loaded SUCCESSFULLY!")
   }
   else{
    console.error("No image loaded.")
   }
}

//Allow user to change their profile picture in any 
function changeImage(event){
    const reader = new FileReader();
    reader.onload = function(){
        const img = document.getElementById('pfp');
        const imgDataUrl = reader.result;
        //To check the image url format correctly
        if (imgDataUrl && imgDataUrl.startsWith('data:image/')) {
            img.src = imgDataUrl;
            localStorage.setItem("profilePicture", imgDataUrl); 
            console.log("Profile picture updated and saved to cookie",imgDataUrl)
        } else {
            console.error("Invalid image data URL");
        }
    };
    //Allow user upload from their computer files.
    if(event.target.files[0]){
        reader.readAsDataURL(event.target.files[0]);
    } else {
        console.error("No file selected");
    }
}

//To display user info
function displayUserInfo() {
    //To retrieve data
    const username = getCookie("username");
    const bio = getCookie("bio");

    //To display data
    if (username) {
        document.getElementById('username').value = username;
    }
    if (bio !== ""){
        document.getElementById('bio').value = bio;
    }
    //To confirm function run properly
    console.log("User Info display successfully.")
}

//To save when user click on blank space(user loses focus on the section)
document.getElementById('username').addEventListener('blur',function(event){
    const username = document.getElementById('username').value;
    setCookie("username", username, 1);//Save for 1 day
});
//To save when user click on blank space(user loses focus on the section)
document.getElementById('bio').addEventListener('blur',function(event){
    const bio = document.getElementById('bio').value;
    setCookie("bio", bio, 1);//Save for 1 day
});

//To call when page loads
window.onload = function() {
    displayUserInfo();
    loadProfilePicture();
};
