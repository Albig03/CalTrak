document.addEventListener("DOMContentLoaded", function () {
    // Get the buttons from the dashboard
    const setGoalsBtn = document.getElementById("setGoalsBtn");
    const trackCaloriesBtn = document.getElementById("trackCaloriesBtn");
    const trackProgressBtn = document.getElementById("trackProgressBtn");
    const viewRecipesBtn = document.getElementById("viewRecipesBtn");
    const settingsBtn = document.getElementById("settingsBtn");

    // Attach event listeners to the buttons
    setGoalsBtn.addEventListener("click", function () {
        window.location.href = "setgoals.html"; // Go to Set Goals page
    });

    trackCaloriesBtn.addEventListener("click", function () {
        window.location.href = "calories.html"; // Go to Track Calories page
    });

    trackProgressBtn.addEventListener("click", function () {
        window.location.href = "track-progress.html"; // Go to Track Progress page
    });

    viewRecipesBtn.addEventListener("click", function () {
        window.location.href = "view-recipes.html"; // Go to View Recipes page
    });

    settingsBtn.addEventListener("click", function () {
        window.location.href = "settings.html"; // Go to Settings page
    });
});
