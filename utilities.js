// Welcome Section Functions
function showWelcome() {
    recipeDetailsContainer.Style.display = "none";
    recipeContainer.style.display = "none";
    welcomeSection.style.display = "grid";
    featuredRecipeDiv.replaceChildren();
    featuredRecipeDiv.textContent = "Featured Recipe";
    selectionH1.textContent = ""
    getFeaturedRecipe();
}



