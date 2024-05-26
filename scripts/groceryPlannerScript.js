document.addEventListener('DOMContentLoaded', function() {
    loadRecipes();

    document.getElementById('add-ingredient').addEventListener('click', function() {
        const ingredientContainer = document.getElementById('ingredient-container');

        const ingredientItem = document.createElement('div');
        ingredientItem.className = 'ingredient-item hStack';

        const amountInput = document.createElement('input');
        amountInput.type = 'text';
        amountInput.placeholder = 'Amount';
        amountInput.className = 'ingredient-amount';

        const ingredientInput = document.createElement('input');
        ingredientInput.type = 'text';
        ingredientInput.placeholder = 'Name';
        ingredientInput.className = 'ingredient-input';

        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.placeholder = 'Category (dairy, meat, produce, etc.)';
        categoryInput.className = 'ingredient-category';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-ingredient special-button red-button';
        deleteBtn.type = 'button';

        deleteBtn.addEventListener('click', function() {
            ingredientContainer.removeChild(ingredientItem);
        });

        ingredientItem.appendChild(amountInput);
        ingredientItem.appendChild(ingredientInput);
        ingredientItem.appendChild(categoryInput);
        ingredientItem.appendChild(deleteBtn);

        ingredientContainer.appendChild(ingredientItem);
    });

    document.getElementById('save-recipe').addEventListener('click', function() {
        const recipeName = document.getElementById('recipe-name').value.trim();
        const ingredientItems = document.querySelectorAll('#ingredient-container .ingredient-item');

        let ingredients = [];

        ingredientItems.forEach(item => {
            const amount = item.querySelector('.ingredient-amount')?.value.trim() || '1';
            const ingredient = item.querySelector('.ingredient-input')?.value.trim();
            const category = item.querySelector('.ingredient-category')?.value.trim() || 'other';

            if (ingredient) {
                ingredients.push({ amount, ingredient, category });
            }
        });

        if (recipeName && ingredients.length > 0) {
            saveRecipe(recipeName, ingredients);
            document.getElementById('recipe-name').value = '';
            document.getElementById('ingredient-container').innerHTML = '';
        } else {
            alert('Please enter a recipe name and at least one ingredient.');
        }
    });

    document.getElementById('generate-list').addEventListener('click', function() {
        generateIngredientList();
    });

    document.getElementById('edit-recipe').addEventListener('click', function() {
        const selectedRecipes = document.querySelectorAll('.regular-button.selected');
        if (selectedRecipes.length !== 1) {
            alert('Please select exactly one recipe to edit.');
            return;
        }
        const recipe = JSON.parse(selectedRecipes[0].dataset.ingredients);
        document.getElementById('recipe-name').value = selectedRecipes[0].textContent;

        const ingredientContainer = document.getElementById('ingredient-container');
        ingredientContainer.innerHTML = '';

        recipe.forEach(item => {
            const ingredientItem = document.createElement('div');
            ingredientItem.className = 'ingredient-item hStack';

            const amountInput = document.createElement('input');
            amountInput.type = 'text';
            amountInput.placeholder = 'Amount';
            amountInput.className = 'ingredient-amount';
            amountInput.value = item.amount;

            const ingredientInput = document.createElement('input');
            ingredientInput.type = 'text';
            ingredientInput.placeholder = 'Name';
            ingredientInput.className = 'ingredient-input';
            ingredientInput.value = item.ingredient;

            const categoryInput = document.createElement('input');
            categoryInput.type = 'text';
            categoryInput.placeholder = 'Category (dairy, meat, produce, etc.)';
            categoryInput.className = 'ingredient-category';
            categoryInput.value = item.category;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-ingredient special-button red-button';
            deleteBtn.type = 'button';

            deleteBtn.addEventListener('click', function() {
                ingredientContainer.removeChild(ingredientItem);
            });

            ingredientItem.appendChild(amountInput);
            ingredientItem.appendChild(ingredientInput);
            ingredientItem.appendChild(categoryInput);
            ingredientItem.appendChild(deleteBtn);

            ingredientContainer.appendChild(ingredientItem);
        });
    });

    let deleteTimeout;
    document.getElementById('delete-recipe').addEventListener('click', function() {
        const selectedRecipes = document.querySelectorAll('.regular-button.selected');
        if (selectedRecipes.length !== 1) {
            alert('Please select exactly one recipe to delete.');
            return;
        }
        if (!deleteTimeout) {
            alert('Press again within 1 second to confirm deletion.');
            deleteTimeout = setTimeout(() => deleteTimeout = null, 1000);
        } else {
            clearTimeout(deleteTimeout);
            deleteTimeout = null;
            const recipeName = selectedRecipes[0].textContent;
            deleteRecipe(recipeName);
        }
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
    const existingIndex = recipes.findIndex(recipe => recipe.name === name);
    if (existingIndex >= 0) {
        recipes[existingIndex] = { name, ingredients };
    } else {
        recipes.push({ name, ingredients });
    }
    localStorage.setItem('recipes', JSON.stringify(recipes));
    createRecipeButton(name, ingredients);
}

function deleteRecipe(name) {
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes = recipes.filter(recipe => recipe.name !== name);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    const button = document.querySelector(`.regular-button[data-ingredients='${name}']`);
    if (button) {
        button.remove();
    }
}

function createRecipeButton(name, ingredients) {
    let recipeButton = document.querySelector(`.regular-button[data-ingredients='${name}']`);
    if (!recipeButton) {
        recipeButton = document.createElement('button');
        recipeButton.className = 'regular-button';
        recipeButton.textContent = name;
        recipeButton.dataset.ingredients = JSON.stringify(ingredients);
        recipeButton.onclick = function() {
            this.classList.toggle('selected');
        };
        const recipeButtonsContainer = document.getElementById('recipe-buttons');
        recipeButtonsContainer.appendChild(recipeButton);
    } else {
        recipeButton.dataset.ingredients = JSON.stringify(ingredients);
    }
}

function generateIngredientList() {
    const selectedRecipes = document.querySelectorAll('.regular-button.selected');
    let allIngredients = {};

    selectedRecipes.forEach(button => {
        const ingredients = JSON.parse(button.dataset.ingredients);
        ingredients.forEach(({ amount, ingredient, category }) => {
            if (!allIngredients[category]) {
                allIngredients[category] = {};
            }
            if (allIngredients[category][ingredient]) {
                allIngredients[category][ingredient] += parseFloat(amount);
            } else {
                allIngredients[category][ingredient] = parseFloat(amount);
            }
        });
    });

    const ingredientListSection = document.getElementById('ingredient-list');
    ingredientListSection.innerHTML = '';

    Object.keys(allIngredients).forEach(category => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        ingredientListSection.appendChild(categoryHeader);

        const ul = document.createElement('ul');

        Object.keys(allIngredients[category]).forEach(ingredient => {
            const li = document.createElement('li');
            const amount = allIngredients[category][ingredient];
            li.textContent = amount ? `${amount} ${ingredient}` : ingredient;
            ul.appendChild(li);
        });

        ingredientListSection.appendChild(ul);
    });
}
