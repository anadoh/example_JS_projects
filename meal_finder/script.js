const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = "";
  //get search value
  const term = search.value;
  console.log(term);
  //check if term empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search result for '${term}': </h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search result. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                        <div class='meal'>
                            <img src="${meal.strMealThumb}" alt="meal.strMeal" />
                            <div class="meal-info" data-mealID="${meal.idMeal}"> 
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `
            )
            .join("");
        }
      });
    //clear search
    search.value = "";
  } else {
    alert("Please enter a search meal");
  }
}
//Fetch meal by id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}
//Fetch random meal
function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

//Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (meal[ingredientKey]) {
      ingredients.push(`${meal[ingredientKey]} - ${meal[measureKey]}`);
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class='single-meal'>
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
        </div>
    </div>`;
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
