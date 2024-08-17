
        $(document).ready(function(){
            let saved = JSON.parse(localStorage.getItem('SavedRecipe'));
            if(saved){
                saved.forEach(recipe => {
                let card = createRecipeCard(recipe.title, recipe.link, recipe.pic);
                $('#saved-recipe-container').append(card);
            });

            //To prevent duplicate saved recipe when localStorage only have 1 record,
            //And also to display maximum 3 items.
            let itemsToShow;
            if(saved.length < 4){
                itemsToShow = saved.length;
            }
            //Display saved recipes using owl carousel structure
            $('#saved-recipe-container').owlCarousel({
                loop:true,
                nav:true,
                autoplay: true, 
                autoplayTimeout: 3000, 
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1,
                    },
                    1200:{
                        items:itemsToShow,//Result of if condition applies here
                    },
                }
            });
            console.log("Owl carousel created.");//To confirm
    
            }else{
                console.log("No recipe found");
                $('#saved-recipe-container').append('<p>No articles saved.</p>');
            }
            console.log("Display successfully");
        });
    
        function createRecipeCard(title,link,pic){
            //Use JQuery object to create html 
            let card = $('<article id="save-recipe-item"></article>');
            let recipelink = $('<a></a>').attr('href',link).attr('target','_blank');
            let picture = $('<img>').attr('src',pic).attr('alt',title);
            let recipetitle = $('<h3></h3>').text(title);
            //Combine all together
            let temp = recipelink.append(picture).append(recipetitle);
            card.append(temp);
            //To confirm card created successfully
            console.log("Successfully create recipe card", card);
            return card;
        }
