function saveRecipe(recipeName, recipeUrl, recipeImage) {
    $.ajax({
        url: 'https://your-api-endpoint.com/saveRecipe',  // Replace with your actual API endpoint
        type: 'POST',
        data: JSON.stringify({
            name: recipeName,
            url: recipeUrl,
            image: recipeImage
        }),
        contentType: 'application/json',
        success: function(response) {
            alert('Recipe saved successfully!');
        },
        error: function(error) {
            alert('Failed to save recipe: ' + error.responseText);
        }
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    
    // Show logged-in user's email
    document.getElementById('loggedUserEmail').innerText = profile.getEmail();
    // Show logout button and hide login button
    document.getElementById('loginIcon').style.display = 'none';
    document.getElementById('logoutIcon').style.display = 'block';
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        // Hide logged-in user's email and logout button, show login button
        document.getElementById('loggedUserEmail').innerText = '';
        document.getElementById('loginIcon').style.display = 'block';
        document.getElementById('logoutIcon').style.display = 'none';
    });
}