//To save user preference recipe
function saveRecipe(title,link,pic){
    let saved = JSON.parse(localStorage.getItem('SavedRecipe')) || [];

    let recipe = {
        title:title,
        link:link,
        pic:pic
    };

    //Prevent 
    if(!saved.some(savedRecipe => savedRecipe.link === link)){
        saved.push(recipe);
    }

    localStorage.setItem('SavedRecipe',JSON.stringify(saved));
    window.alert("Recipe saved!")
    console.log("Successfully save recipe.");
}

//Change color of heart after clicked
document.querySelector('.heart-btn').addEventListener('click', function() {
    this.classList.toggle('clicked');
});
