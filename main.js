//https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// Elements
const cocktailSelect = document.querySelector("#cocktails");
const cataegorySelect = document.querySelector("#categories");
const recipeContainer = document.querySelector(".recipe-container");
//Function calls
getCocktails();
getCategories();
// Event Listeners
cocktailSelect.addEventListener("change",getRecipeByCocktail);
cataegorySelect.addEventListener("change",getRecipeByCategory);

    // Functions
function getCocktails() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((response) => response.json())
        .then(cocktails => renderCocktailOptions(cocktails))
        .catch(error =>alert(error))
}

function getCategories() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")

        .then((response) => response.json())
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


function renderAllRecipes(recipes) {
    recipeContainer.replaceChildren();
    recipes.forEach(recipe => {
        renderRecipeCard(recipe);
    });
    cocktailSelect.value = "";
    cataegorySelect.value = "";
}

function renderRecipeCard(recipe) {
    const { strDrink, strDrinkThumb, strInstructions} = recipe;
console.log(recipe);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const img = document.createElement("img");
    img.src = strDrinkThumb;

    const titel = document.createElement("h3");
    titel.textContent = strDrink;

    cardDiv.append(img, titel);
    recipeContainer.append(cardDiv);
}






    