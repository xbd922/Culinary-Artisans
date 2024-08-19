function displaycomment(recipeName, recipeUrl, recipeImage) {
    $.ajax({
        url: 'https://xbd922.github.io/Culinary-Artisans/api/comment.html',  // Replace with your actual API endpoint
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
