document.addEventListener('DOMContentLoaded', function() {
    loadRecipes(); // Load recipes from local storage on page load

    document.getElementById('add-ingredient').addEventListener('click', function() {
        const ingredientContainer = document.getElementById('ingredient-container');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter ingredient';
        input.className = 'ingredient-input';
        ingredientContainer.appendChild(input);
    });

    document.getElementById('save-recipe').addEventListener('click', function() {
        const recipeName = document.getElementById('recipe-name').value.trim();
        const ingredients = Array.from(document.querySelectorAll('#ingredient-container input'))
            .map(input => input.value.trim())
            .filter(value => value);

        if (recipeName && ingredients.length > 0) {
            saveRecipe(recipeName, ingredients);
        }
    });

    document.getElementById('generate-list').addEventListener('click', function() {
        generateIngredientList();
    });
});

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes.forEach(({ name, ingredients }) => {
        createRecipeButton(name, ingredients);
    });
}

function saveRecipe(name, ingredients) {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes.push({ name, ingredients });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    createRecipeButton(name, ingredients);

    // Clear inputs after saving
    document.getElementById('recipe-name').value = '';
    document.querySelectorAll('#ingredient-container input').forEach(input => input.value = '');
}

function createRecipeButton(name, ingredients) {
    const recipeButton = document.createElement('button');
    recipeButton.className = 'regular-button';
    recipeButton.textContent = name;
    recipeButton.dataset.ingredients = JSON.stringify(ingredients);
    recipeButton.onclick = function() {
        this.classList.toggle('selected');
    };
    document.getElementById('recipes').appendChild(recipeButton);
}

function generateIngredientList() {
    const selectedRecipes = document.querySelectorAll('.regular-button.selected');
    let allIngredients = [];

    selectedRecipes.forEach(button => {
        const ingredients = JSON.parse(button.dataset.ingredients);
        allIngredients = allIngredients.concat(ingredients);
    });

    // Remove duplicates and sort the ingredients
    allIngredients = [...new Set(allIngredients)].sort();

    const ingredientText = allIngredients.join('\n');
    navigator.clipboard.writeText(ingredientText).then(() => {
        alert('Ingredients copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
