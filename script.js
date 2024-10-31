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
