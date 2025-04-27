document.addEventListener("DOMContentLoaded", function () {
    const searchFoodBtn = document.getElementById("searchFoodBtn");
    const foodSearchInput = document.getElementById("foodSearchInput");
    const addedFoodsList = document.getElementById("addedFoodsList");
    const totalCaloriesElem = document.getElementById("totalCalories");
    const totalProteinElem = document.getElementById("totalProtein");
    const totalCarbsElem = document.getElementById("totalCarbs");
    const totalFatsElem = document.getElementById("totalFats");
    const addManualFoodBtn = document.getElementById("addManualFood");
    const backToDashboardBtn = document.getElementById("backToDashboardBtn");

    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;
    let foodItems = [];

    // Function to update the total values
    function updateTotals() {
        totalCaloriesElem.textContent = totalCalories.toFixed(2);
        totalProteinElem.textContent = totalProtein.toFixed(2) + "g";
        totalCarbsElem.textContent = totalCarbs.toFixed(2) + "g";
        totalFatsElem.textContent = totalFats.toFixed(2) + "g";
    }

    // Function to render food items
    function renderFoodItems() {
        addedFoodsList.innerHTML = "";
        foodItems.forEach((food, index) => {
            const li = document.createElement("li");
            li.classList.add("food-item");
            li.innerHTML = `
                <span><strong>${food.name}</strong></span> - 
                <span>${food.calories} kcal</span> | 
                <span>P: ${food.protein}g</span> | 
                <span>C: ${food.carbs}g</span> | 
                <span>F: ${food.fats}g</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            addedFoodsList.appendChild(li);
        });
        updateTotals();
    }

    const apiKey = 't9rpQIBRbeLkYlFhrTPVpUhGrSAwTaphT2hXrdXo'; 
    const apiUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search';

    // Function to search for food
    async function searchFood() {
        const query = foodSearchInput.value.trim();
        if (!query) return;

        // Clear previous results
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = "<p>Loading...</p>";

        try {
            const response = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}&api_key=${apiKey}`);
            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const results = data.foods || [];

            searchResults.innerHTML = ""; 

            // Limit to top 10 results
            const limitedResults = results.slice(0, 10);

            if (limitedResults.length > 0) {
                limitedResults.forEach((foodItem) => {
                    const foodDiv = document.createElement("div");
                    foodDiv.classList.add("food-item");

                    // Extract relevant nutritional info
                    const name = foodItem.description || "Unknown Food";
                    const calories = foodItem.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 0;
                    const protein = foodItem.foodNutrients?.find(n => n.nutrientId === 1003)?.value || 0;
                    const fats = foodItem.foodNutrients?.find(n => n.nutrientId === 1004)?.value || 0;
                    const carbs = foodItem.foodNutrients?.find(n => n.nutrientId === 1005)?.value || 0;

                    foodDiv.innerHTML = `
                        <span><strong>${name}</strong></span><br>
                        <span>Calories: ${calories.toFixed(2)} kcal</span><br>
                        <span>Protein: ${protein.toFixed(2)}g</span> |
                        <span>Carbs: ${carbs.toFixed(2)}g</span> |
                        <span>Fats: ${fats.toFixed(2)}g</span><br>
                        <button class="add-btn" data-food='${JSON.stringify({ name, calories, protein, carbs, fats })}'>Add</button>
                    `;
                    searchResults.appendChild(foodDiv);
                });
            } else {
                searchResults.innerHTML = "<p>No results found.</p>";
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            searchResults.innerHTML = "<p>Error fetching results. Please try again.</p>";
        }
    }

    // Function to add food manually
    function addManualFood() {
        const name = document.getElementById("foodName").value.trim();
        const calories = parseFloat(document.getElementById("manualCalories").value);
        const protein = parseFloat(document.getElementById("manualProtein").value);
        const carbs = parseFloat(document.getElementById("manualCarbs").value);
        const fats = parseFloat(document.getElementById("manualFats").value);

        if (!name || isNaN(calories)) {
            alert("Please provide valid input.");
            return;
        }

        const food = { name, calories, protein, carbs, fats };

        foodItems.push(food);
        totalCalories += calories;
        totalProtein += protein;
        totalCarbs += carbs;
        totalFats += fats;

        renderFoodItems();
    }

    // Function to remove food
    function removeFood(index) {
        totalCalories -= foodItems[index].calories;
        totalProtein -= foodItems[index].protein;
        totalCarbs -= foodItems[index].carbs;
        totalFats -= foodItems[index].fats;

        foodItems.splice(index, 1);
        renderFoodItems();
    }

    searchFoodBtn.addEventListener("click", searchFood);

    // Add food from search result
    document.getElementById("searchResults").addEventListener("click", function (event) {
        if (event.target.classList.contains("add-btn")) {
            const food = JSON.parse(event.target.getAttribute("data-food"));

            foodItems.push(food);
            totalCalories += food.calories;
            totalProtein += food.protein;
            totalCarbs += food.carbs;
            totalFats += food.fats;

            renderFoodItems();
        }
    });

    addManualFoodBtn.addEventListener("click", addManualFood);

    addedFoodsList.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            removeFood(index);
        }
    });

    // Button to go back to the dashboard
    backToDashboardBtn.addEventListener("click", function () {
        window.location.href = "dashboard.html"; 
    });

    // Render food items on initial load
    renderFoodItems();
});
