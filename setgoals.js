document.addEventListener("DOMContentLoaded", function () {
    const goalTypeSelect = document.getElementById("goalType");
    const genderSelect = document.getElementById("userGender");
    const ageInput = document.getElementById("userAge");
    const heightInput = document.getElementById("userHeight");
    const currentWeightInput = document.getElementById("currentWeight");
    const targetWeightInput = document.getElementById("targetWeight");
    const activityLevelSelect = document.getElementById("activityLevel");
    const saveGoalBtn = document.getElementById("saveGoalBtn");
    const resetGoalBtn = document.getElementById("resetGoalBtn");
    const returnToDashboardBtn = document.getElementById("returnToDashboardBtn");
    const savedGoalElement = document.getElementById("savedGoal");

    // Function to calculate BMR using Mifflin-St Jeor Equation
    function calculateBMR(weight, height, age, gender) {
        if (gender === "male") {
            return 10 * weight + 6.25 * height - 5 * age + 5; // Male BMR
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161; // Female BMR
        }
    }

    // Function to calculate the total calorie goal based on activity level
    function calculateCalories(bmr, activityLevel, goalType) {
        const activityMultipliers = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725
        };

        let dailyCalories = bmr * activityMultipliers[activityLevel];

        // Adjust for weight goal
        if (goalType === "gain") {
            dailyCalories += 500; 
        } else if (goalType === "loss") {
            dailyCalories -= 500; 
        }

        return Math.round(dailyCalories);
    }

    // Function to save the goal and display it
    function saveGoal() {
        const goalType = goalTypeSelect.value;
        const gender = genderSelect.value;
        const age = parseInt(ageInput.value);
        const height = parseInt(heightInput.value);
        const currentWeight = parseFloat(currentWeightInput.value);
        const targetWeight = parseFloat(targetWeightInput.value);
        const activityLevel = activityLevelSelect.value;

        // Validate inputs
        if (isNaN(age) || isNaN(height) || isNaN(currentWeight) || isNaN(targetWeight)) {
            alert("Please enter valid numeric values.");
            return;
        }

        // Calculate BMR
        const bmr = calculateBMR(currentWeight, height, age, gender);

        // Calculate the daily calorie intake goal
        const dailyCalories = calculateCalories(bmr, activityLevel, goalType);

        // Display the result
        const goalDetails = `
            <strong>Goal Type:</strong> ${goalType}<br>
            <strong>Gender:</strong> ${gender}<br>
            <strong>Age:</strong> ${age} years<br>
            <strong>Height:</strong> ${height} cm<br>
            <strong>Current Weight:</strong> ${currentWeight} kg<br>
            <strong>Target Weight:</strong> ${targetWeight} kg<br>
            <strong>Activity Level:</strong> ${activityLevel}<br>
            <strong>Daily Calorie Goal:</strong> ${dailyCalories} calories
        `;

        // Store the goal in localStorage
        localStorage.setItem("userGoal", goalDetails);

        // Update the displayed goal
        savedGoalElement.innerHTML = goalDetails;

        alert("Goal saved successfully!");
    }

    // Function to reset the goal
    function resetGoal() {
        localStorage.removeItem("userGoal");
        savedGoalElement.innerHTML = "<p>No goal set yet.</p>";
        alert("Goal has been reset.");
    }

    // Function to go back to the dashboard
    function returnToDashboard() {
        window.location.href = "dashboard.html"; 
    }

    // Load and display the saved goal from localStorage 
    const savedGoal = localStorage.getItem("userGoal");
    if (savedGoal) {
        savedGoalElement.innerHTML = savedGoal;
    }

    saveGoalBtn.addEventListener("click", saveGoal);
    resetGoalBtn.addEventListener("click", resetGoal);
    returnToDashboardBtn.addEventListener("click", returnToDashboard);
});
