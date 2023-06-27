//https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// Elements
const cocktailSelect = document.querySelector("#cocktails");
const cataegorySelect = document.querySelector("#categories");
//Function calls
getCocktails();
getCategories();

// Functions
function getCocktails() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        const cocktails = data.drinks;
        cocktails.forEach((cocktail) => {
            const option = document.createElement("option");
            option.value = cocktail.idDrink;
            option.innerText = cocktail.strDrink;
            cocktailSelect.appendChild(option);
        });
        });
    }

function getCategories() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        const categories = data.drinks;
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.strCategory;
            option.innerText = category.strCategory;
            cataegorySelect.appendChild(option);
        });
        });
    }


function renderCocktailOptions(cocktail) {
    const option = document.createElement("option");
    option.value = cocktail.idDrink;
    option.textContent = cocktail.strDrink;
    cocktailSelect.appendChild(option);
}

function renderCategoryOptions(category) {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    cataegorySelect.appendChild(option);
}

