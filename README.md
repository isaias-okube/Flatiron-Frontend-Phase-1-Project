# Flatiron-Frontend-Phase-1-Project
My Flatiron Phase-1 project
# Cocktail Recipe App

This is a JavaScript application that allows users to browse and discover cocktail recipes. It utilizes thecocktaildb.com API to fetch cocktail data and display it in an interactive interface.

## Features

- Select cocktails by name and category
- View recipe details including ingredients, directions, and resources
- Featured recipe displayed on the main page

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:


2. Open the project directory:


3. Open the `index.html` file in your preferred web browser.

4. Explore and enjoy cocktail recipes!

## Usage

- Select a cocktail from the dropdown menu to view recipes by name.
- Select a category from the dropdown menu to view recipes by category.
- Click on a recipe card to view its details, including ingredients, directions, and resources.
- The featured recipe is displayed on the main page.

## API Usage

This application uses thecocktaildb.com API to fetch cocktail data. It makes the following API calls:

- `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita` - Fetches cocktails by name.
- `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list` - Fetches cocktail categories.
- `https://www.thecocktaildb.com/api/json/v1/1/random.php` - Fetches a random featured recipe.
- `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id}` - Fetches recipe details by cocktail ID.
- `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c={category}` - Fetches recipes by category.

## License

This project is licensed under the [MIT License](LICENSE).
