// Variables
let editIndex = null;
let currentCategory = 'All';

// Main Event Listeners
document.getElementById('submitRecipeBtn').addEventListener('click', addOrUpdateRecipe);
document.getElementById('categoryFilter').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        currentCategory = event.target.textContent;
        displayRecipes();
    }
});

// Load recipes and favorites when the page loads
document.addEventListener('DOMContentLoaded', displayRecipes);
document.addEventListener('DOMContentLoaded', displayFavorites);

// Add or Update Recipe
function addOrUpdateRecipe() {
    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('recipeIngredients').value;
    const instructions = document.getElementById('recipeInstructions').value;
    const category = document.getElementById('recipeCategory').value;

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    if (editIndex === null) {
        const recipe = { name, ingredients, instructions, category };
        recipes.push(recipe);
    } else {
        recipes[editIndex] = { name, ingredients, instructions, category };
        editIndex = null;
        document.getElementById('submitRecipeBtn').textContent = 'Submit';
    }

    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
    $('#recipeModal').modal('hide');
    clearForm();
}

// Display Recipes
function displayRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    const filteredRecipes = recipes.filter(recipe => 
        currentCategory === 'All' || recipe.category === currentCategory
    );

    filteredRecipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.classList.add('recipe-card', 'col-12');
        card.innerHTML = `
            <h4>${recipe.name}</h4>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button class="btn btn-outline-warning" onclick="editRecipe(${index})">Edit</button>
            <button class="btn btn-outline-danger" onclick="deleteRecipe(${index})">Delete</button>
            <button class="btn btn-outline-primary" onclick="addToFavorites(${index})">Favorite</button>
        `;
        recipeList.appendChild(card);
    });
}

// Edit Recipe
function editRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes[index];

    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('recipeIngredients').value = recipe.ingredients;
    document.getElementById('recipeInstructions').value = recipe.instructions;
    document.getElementById('recipeCategory').value = recipe.category;
    document.getElementById('submitRecipeBtn').textContent = 'Update Recipe';

    editIndex = index;
    $('#recipeModal').modal('show');
}

// Delete Recipe
function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}
