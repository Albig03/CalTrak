const apiKey = '91bef6da130d47fe823245db476fc78a';
const recipeList = document.getElementById('recipe-list');

async function fetchRecipes() {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${apiKey}`);
    const data = await response.json();

    recipeList.innerHTML = ''; // Clear any placeholder content

    data.recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.summary.slice(0, 150).replace(/<[^>]+>/g, '')}...</p>
        <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
      `;

      recipeList.appendChild(card);
    });
  } catch (error) {
    recipeList.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
    console.error('Error fetching recipes:', error);
  }
}

fetchRecipes();

