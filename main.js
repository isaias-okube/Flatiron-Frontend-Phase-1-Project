// Element Selectors
const cocktailSelect = document.querySelector("#cocktails");
const cataegorySelect = document.querySelector("#categories");
const recipeContainer = document.querySelector(".recipe-container");
const selectionH1 = document.querySelector(".selection-heading");
const recipeDetailsContainer = document.querySelector(".recipe-details-container");
const recipeDetailsSection = document.querySelector(".recipe-details-section");
const welcomeSection = document.querySelector(".welcome");
const featuredRecipeDiv = document.querySelector(".featured");
const mainTitle = document.querySelector(".main-title");
const ingredientSearch = document.querySelector("#ingredient-search");
const ingredientSearchBtn = document.querySelector("#ingredient-search-btn");
//Function Calls
getRecipesByCocktail();
getCategories();
getFeaturedRecipe();

// Event Listeners
cocktailSelect.addEventListener("change" ,getRecipeByCocktail);
cataegorySelect.addEventListener("change" ,getRecipeByCategory);

 //Dropdown Functions
function getRecipesByCocktail() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((response) => response.json())
    .then(cocktails => renderCocktailOptions(cocktails))
    .catch(error =>alert(error))
}

function getCategories() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    . then((response) => response.json())
    .then(Categories => renderCategoryOptions(Categories))
    .catch(error =>alert(error))
}
function renderCocktailOptions(Cocktails) {
    Cocktails.drinks.forEach(cocktail => {
    const option = document.createElement("option");
    option.value = cocktail.idDrink;
    option.textContent = cocktail.strDrink;
    cocktailSelect.appendChild(option);
    });
}
function renderCategoryOptions(Categories) {
    Categories.drinks.forEach(category => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    cataegorySelect.appendChild(option);
    });
}


function getFeaturedRecipe() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(recipe => renderRecipeCard(recipe.drinks[0],true))
    .catch(error => alert(error));
}

//Recipe collection functions
function getRecipeByCocktail(e) {
    const cocktail = e.target.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail}`)
       .then((response) => response.json())
       .then(recipes=> renderAllRecipes(recipes.drinks))
       .catch(error =>alert(error))
}

function getRecipeByCategory(e) {
    const category = e.target.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then(recipes=> renderAllRecipes(recipes.drinks))
    .catch(error =>alert(error))
}

function getRecipesByIngredient(e) {
    const ingredient = e.target.value;
    if (!ingredient) return
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then(recipes => {
        if (!recipes.drinks) {
            console.log("No recipes found");
            alert(`No recipes found for ${ingredient}`);
        } else {
            renderAllRecipes(recipes.drinks);
        }
    })
    .catch(error =>alert(error))
}

function renderAllRecipes(recipes) {
    welcomeSection.style.display = "none";
    recipeDetailsContainer.style.display = "none";
    recipeContainer.style.display = "grid";
    recipeContainer.replaceChildren();

    selectionH1.textContent = cocktailSelect.value || cataegorySelect.value;

    recipes.forEach(recipe => {
        renderRecipeCard(recipe);
    });
    cocktailSelect.value = "";
    cataegorySelect.value = "";
}

function renderRecipeCard(recipe, featured = false) {
    const {idDrink,strDrink,strDrinkThumb,strInstructions,} = recipe;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.addEventListener("click", e => getRecipeDetails(e,idDrink));
    const image = document.createElement("img");
    image.src = strDrinkThumb;

    const recipeTitleDiv = document.createElement("div");
    recipeTitleDiv.classList.add("recipe-title");
    const titel = document.createElement("h3");
    titel.textContent = strDrink;

    recipeTitleDiv.append(titel);
    cardDiv.append(image, recipeTitleDiv);

    if (featured) {
        featuredRecipeDiv.append(cardDiv);
    } else {
        recipeContainer.append(cardDiv);
    }
}

function getRecipeDetails(e,idDrink) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
        .then((response) => response.json())
        .then(recipe => renderRecipeDetails(recipe.drinks[0]))
        .catch(error =>alert(error))
}

function renderRecipeDetails(recipeDetails) {
    welcomeSection.style.display = "none";
    recipeDetailsContainer.style.display = "grid";
    recipeContainer.replaceChildren();
    selectionH1.textContent = ""
    const {idDrink,strDrink,strDrinkThumb,strInstructions,strCategory,strYoutube,} = recipeDetails;
//Title Area
    const title = document.createElement("p");
    title.textContent = strDrink;
    let titelArea = document.querySelector(".recipe-details-title");
    titelArea.replaceChildren();
    titelArea.append(title);


//Image Area
const imageArea = document.querySelector(".recipe-details-image");
const recipeImage = document.createElement("img");
recipeImage.src = strDrinkThumb;
recipeImage.alt = `Image for ${strDrinkThumb}`;
imageArea.replaceChildren();
imageArea.append(recipeImage);

//Ingredients Area
const ingredients = parseIngredients(recipeDetails);
const ingredientPs = ingredients.map(ingredient => {
const ingredientP = document.createElement("p");
ingredientP.textContent = ingredient;
return ingredientP;
});
const ingredientsArea = document.querySelector(".recipe-details-ingredients");
const ingredientsTitle = document.createElement("h3");
ingredientsTitle.textContent = "Ingredients";
ingredientsTitle.style.textDecoration = "underline";
ingredientsArea.replaceChildren();
ingredientsArea.append(ingredientsTitle, ...ingredientPs);

//Directions Area
