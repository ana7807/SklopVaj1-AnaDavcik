
const recipeCards = document.querySelectorAll(".recipe-card");

function updateRecipePortions(recipe) {
    const portionInput = recipe.querySelector(".portion-input");
    const ingredientAmounts = recipe.querySelectorAll("[data-kolicina]");

    const originalPortions = Number(portionInput.dataset.originalPortions);
    const selectedPortions = Number(portionInput.value);

    if (
        !Number.isInteger(selectedPortions) ||
        selectedPortions < 1 ||
        selectedPortions > 12
    ) {
        return;
    }

    ingredientAmounts.forEach(amount => {
        const originalAmount = Number(amount.dataset.kolicina);
        const newAmount = originalAmount * selectedPortions / originalPortions;

        // Rounds the result to at most one decimal place.
        amount.textContent = Number(newAmount.toFixed(1))
            .toString()
            .replace(".", ",");
    });
}

recipeCards.forEach(recipe => {
    const portionInput = recipe.querySelector(".portion-input");

    if (!portionInput) {
        return;
    }

    portionInput.dataset.originalPortions = portionInput.value;

    portionInput.addEventListener("input", () => {
        updateRecipePortions(recipe);
    });
});
